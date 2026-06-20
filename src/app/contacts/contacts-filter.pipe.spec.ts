import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: any[], term: string): any[] {
    let filteredContacts: any[] = [];
  
    if (term && term.length > 0) {
      filteredContacts = contacts.filter((contact: any) =>
        contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  
    if (filteredContacts.length < 1) {
      return contacts;
    }
  
    return filteredContacts;
  }

}
