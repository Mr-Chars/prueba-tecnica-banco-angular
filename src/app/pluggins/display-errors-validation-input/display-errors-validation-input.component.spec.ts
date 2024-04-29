import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayErrorsValidationInputComponent } from './display-errors-validation-input.component';
import { ERROR_OPTIONS_DISPLAY } from '../../constanst.ts/generals';

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
  it('should set mode to "required" if value.required is true', () => {
    const mockValue = { required: true, pattern: false }; // Mock del valor de entrada
    component.type = mockValue;
    expect(component.mode).toEqual(ERROR_OPTIONS_DISPLAY.required);
  });

  it('should set mode to "pattern" if value.pattern is true', () => {
    const mockValue = { required: false, pattern: true }; // Mock del valor de entrada
    component.type = mockValue;
    expect(component.mode).toEqual(ERROR_OPTIONS_DISPLAY.pattern);
  });

  it('should set mode to empty string if neither required nor pattern is true', () => {
    const mockValue = { required: false, pattern: false }; // Mock del valor de entrada
    component.type = mockValue;
    expect(component.mode).toEqual('');
  });
});
