import { Component, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {

  @ViewChild('subjectInput') subjectInputRef!: ElementRef;
  @ViewChild('msgTextInput') msgTextInputRef!: ElementRef;

  currentSender = '1'; // string because model uses string

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const message = new Message(
      '',
      this.subjectInputRef.nativeElement.value,
      this.msgTextInputRef.nativeElement.value,
      this.currentSender
    );

    this.messageService.addMessage(message);

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}