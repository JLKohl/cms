import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit{
  
  originalDocument: Document;
  document: Document;
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
  
      this.document = {
        id: '',
        name: '',
        url: '',
        description: '',
        children: []
      };
  
      if (!id) {
        this.editMode = false;
        return;
      }
  
      this.originalDocument = this.documentService.getDocument(id);
  
      if (!this.originalDocument) return;
  
      this.editMode = true;
  
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
  
    const newDocument: Document = {
      id: '',
      name: value.name,
      url: value.url,
      description: value.description,
      children: []
    };
  
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
  
    this.router.navigate(['/documents']);
  } 

  onCancel() {
    this.router.navigate(['/documents']);
  }


}
