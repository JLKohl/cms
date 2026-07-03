import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];


  term: string = '';

  subscription: Subscription;

  constructor(private contactService: ContactService){}

  search(value: string) {
    this.term = value;
  }

  onSelected(contact: any) {
    console.log(contact);
  }

  ngOnInit() {

    this.subscription = this.contactService.contactChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  
    this.contactService.getContacts();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
