import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HidePasswordDirective } from '../../directives/hide-password/hide-password.directive';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const directives = [HidePasswordDirective];
const modules = [FontAwesomeModule];

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [directives, modules, NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() public inputName: string = '';
  @Input() public parentForm!: FormGroup;
  @Input() public inputType: string = 'text';
  @Input() public labelName?: string;
  @Input() public placeholder?: string = 'Input Text';
  @Input() public isNotNewsLetter?: boolean = true;
  @Input() public eye: IconDefinition = faEyeSlash;

  public value!: string;
  public chnaged!: (value: string) => void;
  public touched!: () => void;
  public isDisabled!: boolean;

  // Control Value Accesors
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.chnaged = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  protected handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.chnaged(this.value);
    this.touched();
  }

  get formControl() {
    return this.parentForm?.get(this.inputName) as FormControl;
  }

  protected errorMsg() {
    const requiredMsg = this.formControl.errors?.['required'];
    const invalidEmailMsg = this.formControl.errors?.['email'];
    let msg = '';

    if (requiredMsg) {
      msg = 'required';
    }
    if (invalidEmailMsg) {
      msg = 'invalid format';
    }

    return msg;
  }

  protected inputIsValid(): boolean {
    return !this.formControl?.valid && this.formControl?.touched;
  }
}
