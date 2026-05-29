import { EventEmitter, Injectable } from '@angular/core';
import { Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
    
  documents: Document[] = MOCKDOCUMENTS;

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    return this.documents.find(document => document.id === id)!;
  }

}
