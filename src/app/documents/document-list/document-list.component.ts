import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
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
    ),
  
    new Document(
      2,
      'Project Proposal',
      'Initial proposal for the web redesign project',
      'assets/files/project-proposal.pdf',
      []
    ),
  
    new Document(
      3,
      'Meeting Notes',
      'Notes from the weekly team meeting',
      'assets/files/meeting-notes.pdf',
      []
    ),
  
    new Document(
      4,
      'Budget Report',
      'Quarterly budget and expense report',
      'assets/files/budget-report.pdf',
      []
    ),
  
    new Document(
      5,
      'Training Guide',
      'Employee onboarding and training instructions',
      'assets/files/training-guide.pdf',
      []
    )
  ];

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}