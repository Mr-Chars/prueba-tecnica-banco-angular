import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ERROR_OPTIONS_DISPLAY } from '../../constanst.ts/generals';

@Component({
  selector: 'app-display-errors-validation-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-errors-validation-input.component.html',
  styleUrl: './display-errors-validation-input.component.css'
})
export class DisplayErrorsValidationInputComponent {
  @Input() set type(value: any) {
    if (value.required) {
      this.mode = ERROR_OPTIONS_DISPLAY.required;
    }
    if (value.pattern) {
      this.mode = ERROR_OPTIONS_DISPLAY.pattern;
    }

  }

  mode = '';

}
