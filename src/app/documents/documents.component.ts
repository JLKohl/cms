import { Component } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  selectedDocumentEvent:Document | null = null;
}
