import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit{
  document!: Document;
  editMode = false; 

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
  
      if (id) {
        this.editMode = true;
        this.document = this.documentService.getDocument(id);
      } else {
        this.editMode = false;
      }
    });
    
  }


}
