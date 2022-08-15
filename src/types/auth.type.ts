export interface User {
  email: string;
  _id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
  user: User;
}
