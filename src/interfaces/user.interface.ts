export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}
