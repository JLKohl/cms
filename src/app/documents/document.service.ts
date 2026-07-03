import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId: number;
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    this.http
      .get<{ documents: Document[] }>('http://localhost:3000/documents')
      .subscribe({
        next: (response) => {
  
          this.documents = response.documents ? response.documents : [];
  
          this.maxDocumentId = this.getMaxId();
  
          this.documents.sort((a: Document, b: Document) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
  
          this.documentListChangedEvent.next(this.documents.slice());
        },
  
        error: (error: any) => {
          console.log(error);
        }
      });
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    document.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<{ message: string, document: Document }>(
      'http://localhost:3000/documents',
      document,
      { headers: headers }
    )
    .subscribe((responseData) => {
      this.documents.push(responseData.document);
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'http://localhost:3000/documents/' + originalDocument.id,
      newDocument,
      { headers: headers }
    )
    .subscribe(() => {
      this.documents[pos] = newDocument;
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}