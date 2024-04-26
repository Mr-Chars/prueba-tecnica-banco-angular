import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayErrorsValidationInputComponent } from './display-errors-validation-input.component';

describe('DisplayErrorsValidationInputComponent', () => {
  let component: DisplayErrorsValidationInputComponent;
  let fixture: ComponentFixture<DisplayErrorsValidationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayErrorsValidationInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayErrorsValidationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
