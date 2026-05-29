import { EventEmitter, Injectable } from '@angular/core';
import { Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
    
  documents: Document[] = MOCKDOCUMENTS;

  documentChangedEvent = new EventEmitter<Document[]>();

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    return this.documents.find(document => document.id === id)!;
  }

  deleteDocument(document: Document) {
    if (!document) return;
  
    const index = this.documents.indexOf(document);
    if (index < 0) return;
  
    this.documents.splice(index, 1);
  
    this.documentChangedEvent.emit(this.documents.slice());
  }

}
