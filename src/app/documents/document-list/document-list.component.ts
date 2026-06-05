import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{

  documents: Document[] = [];

  subscription: Subscription

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (docs: Document[]) => {
        this.documents = docs;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}