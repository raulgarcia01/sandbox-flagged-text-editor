import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {EditorComponent} from './components/editor/editor.component';
import {FlagSuggestComponent} from './components/flag-suggest/flag-suggest.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, EditorComponent, FlagSuggestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sharedText = '';

  onTextChange(value: string) {
    this.sharedText = value;
  }
}
