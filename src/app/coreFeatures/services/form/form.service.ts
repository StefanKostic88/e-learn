import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoginFormFields,
  RegistrationFormFieldsStudent,
  RegistrationFormFieldsTrainer,
  PasswordChangeFormFields,
} from '../../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private readonly loginFormFields: typeof LoginFormFields = LoginFormFields;
  private readonly registrationFormFieldsStudent: typeof RegistrationFormFieldsStudent =
    RegistrationFormFieldsStudent;
  private readonly registrationFormFieldsTrainer: typeof RegistrationFormFieldsTrainer =
    RegistrationFormFieldsTrainer;

  private readonly passwordChangeFormFields: typeof PasswordChangeFormFields =
    PasswordChangeFormFields;

  public generateLoginFormFields() {
    return new FormGroup({
      [this.loginFormFields.USERNAME]: new FormControl('stTest', [
        Validators.required,
      ]),
      [this.loginFormFields.PASSWORD]: new FormControl('test', [
        Validators.required,
      ]),
    });
  }

  public generateStudentRegistrationFormFields() {
    return new FormGroup({
      [this.registrationFormFieldsStudent.FIRST_NAME]: new FormControl('', [
        Validators.required,
      ]),
      [this.registrationFormFieldsStudent.LAST_NAME]: new FormControl('', [
        Validators.required,
      ]),
      [this.registrationFormFieldsStudent.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.registrationFormFieldsStudent.DATE_OF_BIRTH]: new FormControl(''),
      [this.registrationFormFieldsStudent.ADDRESS]: new FormControl(''),
    });
  }

  public generateTrainerRegistrationFormFields() {
    return new FormGroup({
      [this.registrationFormFieldsTrainer.FIRST_NAME]: new FormControl('', [
        Validators.required,
      ]),
      [this.registrationFormFieldsTrainer.LAST_NAME]: new FormControl('', [
        Validators.required,
      ]),
      [this.registrationFormFieldsTrainer.EMAIL]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.registrationFormFieldsTrainer.SPECIALIZATION]: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  public generatePasswordChangeFomrFields() {
    return new FormGroup({
      [this.passwordChangeFormFields.CURRENT_PASSWORD]: new FormControl('', [
        Validators.required,
      ]),
      [this.passwordChangeFormFields.NEW_PASSWORD]: new FormControl('', [
        Validators.required,
      ]),
      [this.passwordChangeFormFields.CONFIRM_PASSWORD]: new FormControl('', [
        Validators.required,
      ]),
    });
  }
}
