import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})

export class MessageListComponent {

  selectedMessage: Message | null = null;

  onMessageSelected(message: Message) {
    this.selectedMessage = message;
  }

  messages: Message[] = [
    new Message(1, 'Hello', 'Hey there!', 'Alice'),
    new Message(2, 'Angular', 'Angular is fun', 'Bob'),
    new Message(3, 'Reminder', 'Don’t forget class', 'Carol')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
