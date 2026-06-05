import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  
  contacts: Contact[] = MOCKCONTACTS;

  maxContactId: number;

  contactChangedEvent = new Subject<Contact[]>();

  constructor() {
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice()
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id)!;
  }

  getMaxId(): number {
    let maxId = 0;
  
    for (const contact of this.contacts) {
      const currentId = +contact.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
  
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
  
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
  
    this.contacts.push(newContact);
  
    this.contactChangedEvent.next(this.contacts.slice());
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
  
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
  
    newContact.id = originalContact.id;
  
    this.contacts[pos] = newContact;
  
    this.contactChangedEvent.next(this.contacts.slice());
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
  
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
  
    this.contacts.splice(pos, 1);
  
    this.contactChangedEvent.next(this.contacts.slice());
  } 
}
