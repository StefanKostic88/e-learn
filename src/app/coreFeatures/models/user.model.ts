export interface LoginUser {
  username: string;
  password: string;
}

export interface CreatedUser extends LoginUser {}

export interface RegisterUser {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  specialization?: string;
  adress?: string;
  dateOfBirth?: string;
}

export interface TrainerRefined {
  name: string;
  userId: string;
  specialization?: string | undefined;
}

export interface StudentRefined {
  name: string;
  user_id: string;
  isActive: boolean;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EditInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  address?: string;
  dateOfBirth?: string;
  specialization?: string;
  img?: string;
}

export interface CreatedUserResponse {
  message: string;
  data: CreatedUser;
}

export interface LoginResponse {
  token: string;
  message: string;
  headers: Record<string, string>;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface UserData {
  isActive: string;
  password: string;
  specialization?: string;
  role: string;
  lastName: string;
  username: string;
  address: string;
  email: string;
  id: string;
  firstName: string;
  img?: string;
  dateOfBirth?: string;
  myUsers?: string[];
}

export interface UserDataRespnse {
  data: UserData;
}

export interface MyUsersResponse {
  data: UserData[];
  message: string;
}

export interface UserEditResponse {
  message: string;
}

export interface HeaderDetails {
  email: string | null;
  username: string | null;
  img: string;
}

export interface HeaderData {
  isAuthorized: boolean;
  accountData: HeaderDetails;
}

export interface TrainerOption {
  trainerId: string;
  trainerName: string;
  specialization?: string;
}

export interface myStudent {
  name: string;
  isActive: boolean;
  userId: string;
}

export interface TrainingCreationAttribute {
  trainer_id: string;
  student_id: string;
  specialization: string;
  trainingName: string;
  trainingType: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  trainerName: string;
  studentName: string;
  description?: string;
}

export interface MyTrainingsResponse {
  data: TrainingCreationAttribute[];
  message: string;
}

export interface MyTrainingTableData {
  startDate: Date;
  trainingName: string;
  trainingType: string;
  trainer: string;
  duration: string;
  student: string;
}

export interface TrainerFormControlData {
  specialization: string;
  trainerId: string;
  trainerName: string;
}

export interface TrainingForm {
  trainingName: string;
  startDate: Date;
  duration: number;
  trainingType: string;
  trainer: TrainerFormControlData;
  logedInUser: string;
  description: string;
}

export interface S3PutResponse {
  data: string;
  key: string;
}
