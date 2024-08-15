export interface JoinUsBox {
  title: string;
  content: string;
  img: string;
  navigateTo: () => void;
}

export interface NavigationLink {
  path: string;
  linkName: string;
  active?: boolean;
}

export interface RegistrationInputInterface {
  formControlName: string;
  labelName: string;
}

export interface EditFormInput {
  formControlName:
    | 'firstName'
    | 'lastName'
    | 'username'
    | 'email'
    | 'dateOfBirth'
    | 'address';
  labelName: string;
  value: string | undefined;
}

export interface HeaderLinkList {
  path: string;
  linkName: string;
  active?: boolean;
}

// ENUMS

export enum Role {
  TRAINER = 'trainer',
  STUDENT = 'student',
}

export enum LoginFormFields {
  USERNAME = 'username',
  PASSWORD = 'password',
}

export enum RegistrationFormFieldsStudent {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  DATE_OF_BIRTH = 'dateOfBirth',
  ADDRESS = 'address',
}
export enum RegistrationFormFieldsTrainer {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  SPECIALIZATION = 'specialization',
}

export enum PasswordChangeFormFields {
  CURRENT_PASSWORD = 'currentPassword',
  NEW_PASSWORD = 'newPassword',
  CONFIRM_PASSWORD = 'confirmPassword',
}

export enum EditFormFeilds {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  USERNAME = 'username',
  EMAIL = 'email',
  ADDRESS = 'address',
  DATE_OF_BIRTH = 'dateOfBirth',
  SPECIALIZATION = 'specialization',
}

export enum SearchFormFeild {
  SEARCH_STUDENT = 'searchStudent',
  FROM = 'fromDate',
  TO = 'toDate',
  SEARCH_SPECIALIZATION = 'searchSpecialization',
}

export enum CreateTrainingFilds {
  TRAINING_NAME = 'trainingName',
  START_DATE = 'startDate',
  DURATION = 'duration',
  TRAINING_TYPE = 'trainingType',
  TRAINER = 'trainer',
  LOGGED_IN_USER = 'logedInUser',
  DESCRIPTION = 'description',
}
