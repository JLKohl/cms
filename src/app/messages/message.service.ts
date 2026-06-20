import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];

  maxMessageId: number;

  messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {

  }

  getMessages() {
    this.http
      .get<Message[]>('https://jlkcms-default-rtdb.firebaseio.com/messages.json')
      .subscribe({
        next: (messages: Message[]) => {
  
          this.messages = messages ? messages : [];

          this.maxMessageId = this.getMaxId();
  
          this.messages.sort((a: Message, b: Message) => {
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return 0;
          });
  
          this.messageChangedEvent.emit(this.messages.slice());
        },
  
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id)!;
  }

addMessage(message: Message) {
  this.messages.push(message);
  this.storeMessages();
}

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http
      .put(
        'https://jlkcms-default-rtdb.firebaseio.com/messages.json',
        JSON.stringify(this.messages),
        { headers: headers }
      )
      .subscribe(() => {
        this.messageChangedEvent.emit(this.messages.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;
  
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
  
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
  
    return maxId;
  }
}
