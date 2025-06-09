import {Component, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {RadioButton} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {TextUtilService} from '../../services/text-util.service';

@Component({
  selector: 'app-flag-suggest',
  imports: [
    InputText,
    RadioButton,
    FormsModule,
    Button
  ],
  templateUrl: './flag-suggest.component.html',
  styleUrl: './flag-suggest.component.css'
})
export class FlagSuggestComponent  implements OnInit {
  /**
   * Initialize component variables
   */
  selectedTextMatch: any = null;
  flaggedSentence = '';
  suggestedSentence = '';

  constructor(private textUtilService: TextUtilService) {}

  /**
   * Init flagged component to setup default text search values
   */
  ngOnInit() {
    this.selectedTextMatch = "full";
  }

  /**
   * Execute a search for the current text sentence to be highlighted
   */
  sendFlaggedSentence() {
    this.textUtilService.triggerApplyHighlight(this.selectedTextMatch, this.flaggedSentence);
  }

  /**
   * Execute a search and text replacement
   */
  applyTextReplacement() {
    this.textUtilService.triggerApplyReplaceText(this.selectedTextMatch, this.flaggedSentence, this.suggestedSentence);
    this.flaggedSentence = '';
    this.suggestedSentence = '';
  }

  /**
   * Triggers a undo changes on the editor component
   */
  applyUndoChange(){
    this.textUtilService.triggerUndoChange();
  }

}
