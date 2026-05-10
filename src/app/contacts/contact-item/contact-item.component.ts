import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contacts.model';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})

export class ContactItemComponent {
  @Input() contact!: Contact;
  @Output() contactClicked = new EventEmitter<Contact>();

  onClick() {
    this.contactClicked.emit(this.contact);
  }
}
