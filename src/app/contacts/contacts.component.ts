import { Component } from '@angular/core';
import { Contact } from './contacts.model';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact: Contact;
}
