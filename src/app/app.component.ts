import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'cms';

  selectedFeature: string = 'documents';

  switchView(feature: string) {
    this.selectedFeature = feature;
  }
}
