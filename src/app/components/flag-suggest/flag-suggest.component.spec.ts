import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagSuggestComponent } from './flag-suggest.component';

describe('FlagSuggestComponent', () => {
  let component: FlagSuggestComponent;
  let fixture: ComponentFixture<FlagSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagSuggestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
