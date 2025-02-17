export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthHeaders = {
  "access-token": string;
  client: string;
  uid: string;
  expiry: string;
};

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};
