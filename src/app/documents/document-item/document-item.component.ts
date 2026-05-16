import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document!: Document;
@Output()documentSelected = new EventEmitter<Document>();

onClick() {
  this.documentSelected.emit(this.document);
}
}
