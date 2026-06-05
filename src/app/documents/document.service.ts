import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document} from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
    
  documents: Document[] = MOCKDOCUMENTS;

  maxDocumentId: number;

  documentListChangedEvent  = new Subject<Document[]>();

  constructor() {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: number): Document {
    return this.documents.find(document => document.id === id)!;
  }

  getMaxId(): number {
    let maxId = 0;
  
    for (const document of this.documents) {
      const currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
  
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
  
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
  
    this.documents.push(newDocument);
  
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;
  
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
  
    newDocument.id = originalDocument.id;
  
    this.documents[pos] = newDocument;
  
    this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document) return;
  
    const index = this.documents.indexOf(document);
    if (index < 0) return;
  
    this.documents.splice(index, 1);
  
    this.documentListChangedEvent.next(this.documents.slice());
  }

}
