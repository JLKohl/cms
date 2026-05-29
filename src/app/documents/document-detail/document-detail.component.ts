import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service'; 

import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{

  document!: Document;
  nativeWindow: any;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private windRefService: WindRefService, 
    private router: Router
  ) {}

  ngOnInit() {
  this.route.params.subscribe(params => {
    const id = params['id'];
    this.document = this.documentService.getDocument(id);
  });

  this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (!this.document || !this.document.url) return;
  
    this.nativeWindow.open(this.document.url);
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents');
  }

}
