import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{

  document!: Document;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit() {
  this.route.params.subscribe(params => {
    const id = params['id'];
    this.document = this.documentService.getDocument(id);
  });
}

}
