import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkNumberValidator(): ValidatorFn {
  return function (
    control: AbstractControl<string, string>
  ): ValidationErrors | null {
    const numbersControl = control.value;

    const validNumber = Number(numbersControl);

    return numbersControl.length !== 0 && !validNumber
      ? { invalidNumberFormat: true }
      : null;
  };
}
