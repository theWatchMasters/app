export interface IErrorResponse {
  success: false;
  error: string;
}

// A partial user type, used in responses where we don't want to return the full user object
export interface IUser {
  id: string;
  avatar_id: string;
  email: string;
  vault_amount: number;
}
