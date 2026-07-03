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
      .get<Contact[]>('http://localhost:3000/contacts')
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
    return this.contacts.find(c => c.id === id);
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
  
    newContact.id = '';
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http.post<{ message: string, contact: Contact }>(
      'http://localhost:3000/contacts',
      newContact,
      { headers: headers }
    )
    .subscribe((responseData) => {
      this.contacts.push(responseData.contact);
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
  
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    
    if (pos < 0) return;
  
    newContact.id = originalContact.id;
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'http://localhost:3000/contacts/' + originalContact.id,
      newContact,
      { headers: headers }
    )
    .subscribe(() => {
      this.contacts[pos] = newContact;
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }

  storeContacts() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http.put(
      'https://jlkcms-default-rtdb.firebaseio.com/contacts.json',
      JSON.stringify(this.contacts),
      { headers: headers }
    )
    .subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
  
    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;
  
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe(() => {
      this.contacts.splice(pos, 1);
      this.contactChangedEvent.next(this.contacts.slice());
    });
  } 
}
