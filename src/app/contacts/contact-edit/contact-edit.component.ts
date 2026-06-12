import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ContactService } from '../contact.service';
import { Contact } from '../contacts.model';


@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit{

  @Input() contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: '',
    imageUrl: '',
    group: []
  };

  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
  
  
      if (!id) {
        this.editMode = false;
        return;
      }
  
   
      this.originalContact = this.contactService.getContact(id);
  
      if (!this.originalContact) return;
  
      this.editMode = true;
  
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
  
      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
  
    const newContact: Contact = {
      id: '0',
      name: value.name,
      email: value.email,
      phone: value.phone,
      imageUrl: value.imageUrl,
      group: this.groupContacts
    };
  
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
  
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }

  onRemoveItem(index: number) {
    this.groupContacts.splice(index, 1);
  }

}
