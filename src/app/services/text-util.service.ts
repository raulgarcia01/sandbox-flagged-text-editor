import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Payload} from './payload';

@Injectable({
  providedIn: 'root'
})
export class TextUtilService {

  /**
   * Initialize shared service observable variables
   */

  private replaceFlaggedText = new Subject<Payload>();

  private searchTextSource = new Subject<Payload>();

  private undoTextSource = new Subject<string>();

  applyReplace$ = this.replaceFlaggedText.asObservable();

  searchTextInput$ = this.searchTextSource.asObservable();

  undoAction$ = this.undoTextSource.asObservable();

  /**
   * Shared component function to execute the text highlight work
   * @param type Text match if partial or full
   * @param input Text search to be match
   */
  triggerApplyHighlight(type: 'partial' | 'full', input: string) {
    const payload: Payload = { type: type, textMatch: input };
    this.searchTextSource.next(payload);
  }

  /**
   * Shared component function to execute the text replacement work
   * @param type Text match if partial or full
   * @param searchText Text search to be match
   * @param replaceText Text used to be replaced
   */
  triggerApplyReplaceText(type: 'partial' | 'full', searchText: string, replaceText: string) {
    const payload: Payload = { type: type, textMatch: searchText, replaceText: replaceText };
    this.replaceFlaggedText.next(payload);
  }

  /**
   * Shared component function to execute simple undo logic
   */
  triggerUndoChange(){
    this.undoTextSource.next('');
  }

  /**
   * Function to normalize cleanup and extract raw text from HTML
   * @param value The input string that may contain HTML and special entities
   * @returns The plain text string with no HTML tags or `&nbsp;` entities.
   */
  normalizeAndStripHtml(value: string): string {
    if (!value) return '';
    const normalized = value.replace(/&nbsp;/g, ' ');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = normalized;
    return tempDiv.textContent || tempDiv.innerText || '';
  }


  /**
   *  Creates a regular expression to match a target string based on match type.
   * @param target The string to be matched in the content.
   * @param type  Specifies whether to match the full word ('full') or any occurrence ('partial').
   * @returns A RegExp object configured for the desired matching behavior.
   */
  createRegexPattern(target: string, type: 'partial' | 'full'): RegExp {
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return type === 'full'
      ? new RegExp(`\\b(${escaped})\\b`, 'igm')
      : new RegExp(escaped, 'igm');
  }

}
