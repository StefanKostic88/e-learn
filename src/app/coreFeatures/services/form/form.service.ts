import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoginFormFields,
  RegistrationFormFieldsStudent,
  RegistrationFormFieldsTrainer,
  PasswordChangeFormFields,
  EditFormFeilds,
  SearchFormFeild,
  CreateTrainingFilds,
} from '../../models/shared.models';
import { checkNumberValidator } from '../../../shared/validators/check-number-validator/checkNumberDirective';
import { TrainerOption } from '../../models/user.model';

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

  private readonly searchFormFeild: typeof SearchFormFeild = SearchFormFeild;

  private readonly editFormFeilds: typeof EditFormFeilds = EditFormFeilds;
  private readonly createTrainingFilds: typeof CreateTrainingFilds =
    CreateTrainingFilds;

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

  public generateEditFormFields() {
    return new FormGroup({
      [this.editFormFeilds.FIRST_NAME]: new FormControl(''),
      [this.editFormFeilds.LAST_NAME]: new FormControl(''),
      [this.editFormFeilds.USERNAME]: new FormControl(''),
      [this.editFormFeilds.EMAIL]: new FormControl(''),
      [this.editFormFeilds.ADDRESS]: new FormControl(''),
      [this.editFormFeilds.DATE_OF_BIRTH]: new FormControl(''),
      [this.editFormFeilds.SPECIALIZATION]: new FormControl(''),
      [this.editFormFeilds.PROFILE_PHOTO]: new FormControl(''),
    });
  }

  public generateSearchFormFeailds() {
    const currentDate = new Date();
    const nextTenDays = new Date();
    nextTenDays.setDate(currentDate.getDate() + 10);

    return new FormGroup({
      [this.searchFormFeild.SEARCH_STUDENT]: new FormControl(''),
      [this.searchFormFeild.FROM]: new FormControl(currentDate),
      [this.searchFormFeild.TO]: new FormControl(nextTenDays),
      [this.searchFormFeild.SEARCH_SPECIALIZATION]: new FormControl(''),
    });
  }

  public generateCreateTrainingField(trainingType: string) {
    return new FormGroup({
      [this.createTrainingFilds.TRAINING_NAME]: new FormControl('', [
        Validators.required,
      ]),
      [this.createTrainingFilds.START_DATE]: new FormControl(new Date()),
      [this.createTrainingFilds.DURATION]: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        checkNumberValidator(),
      ]),
      [this.createTrainingFilds.TRAINING_TYPE]: new FormControl(trainingType),
      [this.createTrainingFilds.TRAINER]: new FormControl({
        specialization: '',
        trainerId: '',
        trainerName: '',
      }),
      [this.createTrainingFilds.LOGGED_IN_USER]: new FormControl(''),
      [this.createTrainingFilds.DESCRIPTION]: new FormControl(''),
    });
  }

  public generateTrainerSelectOptionData(form: FormGroup, data: TrainerOption) {
    form.get('trainer')?.setValue({
      specialization: data?.specialization,
      trainerId: data?.trainerId,
      trainerName: data?.trainerName,
    });
  }
}
