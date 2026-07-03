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

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http
      .get<{ messages: Message[] }>('http://localhost:3000/messages')
      .subscribe({
        next: (response) => {
  
          this.messages = response.messages ? response.messages : [];
  
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
    return this.messages.find(m => m.id === id)!;
  }

  addMessage(message: Message) {
    if (!message) return;

    message.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<{ message: string, messageObj: Message }>(
      'http://localhost:3000/messages',
      message,
      { headers: headers }
    )
    .subscribe((responseData) => {
      this.messages.push(responseData.messageObj);
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) return;

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) return;

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'http://localhost:3000/messages/' + originalMessage.id,
      newMessage,
      { headers: headers }
    )
    .subscribe(() => {
      this.messages[pos] = newMessage;
      this.messageChangedEvent.emit(this.messages.slice());
    });
  }

  deleteMessage(message: Message) {
    if (!message) return;

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) return;

    this.http.delete('http://localhost:3000/messages/' + message.id)
      .subscribe(() => {
        this.messages.splice(pos, 1);
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