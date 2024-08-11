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
