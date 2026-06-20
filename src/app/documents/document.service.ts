import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document} from './document.model';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {
    
  documents: Document[] = [];

  maxDocumentId: number;

  documentListChangedEvent  = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http
      .get<Document[]>('https://jlkcms-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
  
          this.documents = documents ? documents : [];
  
          // 1. update max id
          this.maxDocumentId = this.getMaxId();
  
          // 2. sort documents by name
          this.documents.sort((a: Document, b: Document) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
  
          // 3. emit updated list
          this.documentListChangedEvent.next(this.documents.slice());
  
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id)!;
  }

  getMaxId(): number {
    let maxId = 0;
  
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
  
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
  
    return maxId;
  }

  storeDocuments() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    this.http
      .put(
        'https://jlkcms-default-rtdb.firebaseio.com/documents.json',
        JSON.stringify(this.documents),
        { headers: headers }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
  
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
  
    this.documents.push(newDocument);
  
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;
  
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) return;
  
    newDocument.id = originalDocument.id;
  
    this.documents[pos] = newDocument;
  
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) return;
  
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) return;
  
    this.documents.splice(pos, 1);
  
    this.storeDocuments();

    console.log(this.documents);
  }

}
