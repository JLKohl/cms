import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contacts.model';



@Injectable({
  providedIn: 'root',
})
export class ContactService {
  
  contacts: Contact[] = [];

  maxContactId: number;

  contactChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
      .get<Contact[]>('https://jlkcms-default-rtdb.firebaseio.com/contacts.json')
      .subscribe({
        next: (contacts: Contact[]) => {
  
          this.contacts = contacts ? contacts : [];
  
          this.maxContactId = this.getMaxId();
  
          this.contacts.sort((a: Contact, b: Contact) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
  
          this.contactChangedEvent.next(this.contacts.slice());
        },
  
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  getContact(id: string): Contact {
    return this.contacts.find(c => c.id.toString() === id.toString())!;
  }

  getMaxId(): number {
    let maxId = 0;
  
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
  
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
  
    this.storeContacts();
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
  
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;
  
    newContact.id = originalContact.id;
  
    this.contacts[pos] = newContact;
  
    this.storeContacts();
  }

  storeContacts() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http
      .put(
        'https://jlkcms-default-rtdb.firebaseio.com/contacts.json',
        JSON.stringify(this.contacts),
        { headers: headers }
      )
      .subscribe(() => {
        this.storeContacts();
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
  
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
  
    this.contacts.splice(pos, 1);
  
    this.storeContacts();
  } 
}
