import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Editor} from 'primeng/editor';
import {TextUtilService} from '../../services/text-util.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule, Editor],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  /**
   * Initialize component variables
   */
  editorText: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
    'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate' +
    ' velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
    'culpa qui officia deserunt mollit anim id est laborum."';

  searchText: string = '';
  historyStack: string[] = [];

  constructor(private textUtilService: TextUtilService) {
  }

  /**
   * Init component Editor setup to observable variables using textService
   */
  ngOnInit() {
    this.textUtilService.searchTextInput$.subscribe(payload => {
      this.searchText = payload.textMatch;
      this.editorText = this.highlightHtml(this.editorText, this.searchText, payload.type);
    });

    this.textUtilService.applyReplace$.subscribe(payload => {
      this.editorText = this.replaceMatchText(this.editorText,
        payload.textMatch,
        (payload.replaceText === undefined) ? '' : payload.replaceText,
        payload.type);
    });

    this.textUtilService.undoAction$.subscribe(payload => {
      this.undo();
      console.log('UNDO executed ' + payload);
    })
  }

  /**
   * Function to Highlight the search text in the editor component
   * @param value Current text inside the editor
   * @param args  The string to be matched in the content.
   * @param type Specifies whether to match the full word ('full') or any occurrence ('partial').
   */
  highlightHtml(
    value: string,
    args: string,
    type: 'partial' | 'full' = 'partial'
  ): string {
    const plainText = this.textUtilService.normalizeAndStripHtml(value);
    if (!args?.trim()) return plainText;

    const regex = this.textUtilService.createRegexPattern(args, type);
    this.onTextChange();
    return plainText.replace(regex, '<span style="background-color: yellow">$&</span>');
  }

  /**
   * Function to find and replace text in the editor component
   * @param value Current text inside the editor
   * @param target The string to be matched in the content.
   * @param replacement The string to be replaced in the content.
   * @param type Specifies whether to match the full word ('full') or any occurrence ('partial').
   */
  replaceMatchText(
    value: string,
    target: string,
    replacement: string,
    type: 'partial' | 'full' = 'partial'
  ): string {
    const plainText = this.textUtilService.normalizeAndStripHtml(value);
    if (!target?.trim()) return plainText;

    const regex = this.textUtilService.createRegexPattern(target, type);
    this.onTextChange();
    return plainText.replace(regex, replacement);
  }

  /**
   * Basic logic to implement a history track on text editor changes
   */
  onTextChange(): void {
    this.historyStack.push(this.editorText);
  }

  /**
   * Undo logic to retrieve the history change text value
   */
  undo(): void {
    if (this.historyStack.length > 1) {
      this.historyStack.pop(); // remove current
      this.editorText = this.historyStack[this.historyStack.length - 1] || '';
    }
  }

}
