import { Component } from '@angular/core';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService){}

  ngOnInit() {
    this.contacts = this.contactService.getContacts()
  }

  onSelected(contact: Contact){
    console.log("SELECTED FROM LIST:", contact);
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
