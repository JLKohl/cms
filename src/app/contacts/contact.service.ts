import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  
  contacts: Contact[] = [];

  contactChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice()
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id)!;
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
  
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
  
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

}
