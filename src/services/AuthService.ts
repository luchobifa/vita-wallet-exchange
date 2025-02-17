import { AuthHeaders, SignInCredentials } from "../types/auth";
import { AuthDataResponse } from "../types/data/User_Response";
import { ApiService } from "./ApiService";

class AuthService extends ApiService {
  constructor() {
    super("https://api.qa.vitawallet.io/api");
  }

  async signIn(credentials: SignInCredentials) {
    const response = await this.api.post<AuthDataResponse>(
      "/auth/sign_in",
      {
        email: credentials.email,
        password: credentials.password,
        dev_mode: true,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "app-name": "ANGIE",
        },
      }
    );

    const headers: AuthHeaders = {
      "access-token": response.headers["access-token"],
      client: response.headers.client,
      uid: response.headers.uid,
      expiry: response.headers.expiry,
    };

    this.setAuthHeaders(headers);

    return {
      user: {
        email: response.data.attributes?.email,
        isAdmin: response.data.attributes?.is_admin,
        id: response.data?.id,
      },
      headers,
    };
  }
}

export const authService = new AuthService();
