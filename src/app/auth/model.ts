export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface ISignIn {
  email: string;
  password: string;
}

export interface IAuth {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  phoneNumber: string;
}
