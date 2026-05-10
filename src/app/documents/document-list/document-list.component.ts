import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      1,
      'Example Document',
      'This is a sample document',
      'assets/files/example.pdf',
      []
    )
  ];

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}