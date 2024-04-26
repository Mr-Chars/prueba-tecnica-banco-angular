import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
      this.mode = 'REQUIRED';
    }
    if (value.pattern) {
      this.mode = 'PATTERN';
    }

  }

  mode = '';

}
