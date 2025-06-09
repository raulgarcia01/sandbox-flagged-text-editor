import { TestBed } from '@angular/core/testing';

import { TextUtilService } from './text-util.service';
import {Payload} from './payload';

describe('HighlightService', () => {
  let service: TextUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#triggerApplyHighlight', () => {
    it('should emit value through searchTextInput$', (done) => {
      const expected: Payload = { type: 'partial', textMatch: 'test' };
      service.searchTextInput$.subscribe((payload) => {
        expect(payload).toEqual(expected);
        done();
      });
      service.triggerApplyHighlight('partial', 'test');
    });
  });

  describe('#triggerApplyReplaceText', () => {
    it('should emit value through applyReplace$', (done) => {
      const expected: Payload = {
        type: 'full',
        textMatch: 'replace',
        replaceText: 'new'
      };
      service.applyReplace$.subscribe((payload) => {
        expect(payload).toEqual(expected);
        done();
      });
      service.triggerApplyReplaceText('full', 'replace', 'new');
    });
  });

  describe('#triggerUndoChange', () => {
    it('should emit empty string through undoAction$', (done) => {
      service.undoAction$.subscribe((value) => {
        expect(value).toBe('');
        done();
      });
      service.triggerUndoChange();
    });
  });

  describe('#normalizeAndStripHtml', () => {
    it('should remove HTML tags and &nbsp;', () => {
      const input = `<p>Hello&nbsp;World</p>`;
      const result = service.normalizeAndStripHtml(input);
      expect(result).toBe('Hello World');
    });

    it('should return empty string if input is falsy', () => {
      expect(service.normalizeAndStripHtml('')).toBe('');
      expect(service.normalizeAndStripHtml(null as any)).toBe('');
    });
  });

  describe('#createRegexPattern', () => {
    it('should return RegExp for full match with word boundaries', () => {
      const regex = service.createRegexPattern('test', 'full');
      expect('this is a test'.match(regex)).toContain('test');
    });

    it('should return RegExp for partial match', () => {
      const regex = service.createRegexPattern('es', 'partial');
      expect('test'.match(regex)).toContain('es');
    });

    it('should escape special characters in pattern', () => {
      const regex = service.createRegexPattern('.*', 'partial');
      const result = '.*'.match(regex);
      expect(result).toContain('.*');
    });
  });
});
