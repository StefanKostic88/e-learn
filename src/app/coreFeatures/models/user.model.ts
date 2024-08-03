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

export interface TrainerInterface {
  id: string;
  firstName: string;
  lastName: string;
  trainer: {
    specialization: {
      specializationName: string;
      _id: string;
    };
    _id: string;
    user_id: string;
  };
}

export interface TrainerRefined {
  name: string;
  user_id: string;
  specialization: string;
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
  adress?: string;
  dateOfBirth?: string;
  specialization?: string;
}

export interface TrainerData {
  _id: string;
  user_id: string;
  specialization: {
    specializationName: string;
    _id: string;
  };
  myStudents: {
    firstName: string;
    lastName: string;
    id: string;
    isActive: boolean;
  }[];
}

// export interface UserData {
//   id: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   isActive: boolean;
//   img?: string;
//   adress?: string;
//   dateOfBirth?: string;
//   student: {
//     _id: string;
//     user_id: string;
//     myTrainers: {
//       trainer: TrainerData;
//       firstName: string;
//       lastName: string;
//       id: string;
//     }[];
//   } | null;
//   trainer: TrainerData | null;
// }

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
  data: string;
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
}

export interface UserDataRespnse {
  data: UserData;
}

export interface UserEditResponse {
  message: string;
}

// HEADER DATA
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
  specialization: string;
}
