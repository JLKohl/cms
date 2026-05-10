import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {

  @Input() message!: Message;
  @Output() messageSelected = new EventEmitter<Message>();

  onClick() {
    this.messageSelected.emit(this.message);
  }
}
