import { AuthHeaders } from "../types/auth";
import { UserProfile } from "../types/userProfile";
import { ApiService } from "./ApiService";

class UserService extends ApiService {
  constructor() {
    super();
  }

  async getProfile(headers: AuthHeaders) {
    const response = await this.api.get("/profile", {
      headers: {
        "app-name": "ANGIE",
        "access-token": headers["access-token"],
        uid: headers.uid,
        client: headers.client,
        expiry: headers.expiry,
      },
    });

    const userProfile: UserProfile = {
      firstName: response.data.data.attributes.first_name,
      lastName: response.data.data.attributes.last_name,
      email: response.data.data.attributes.email,
      isAdmin: response.data.data.attributes.is_admin,
      balances: response.data.data.attributes.balances,
      id: response.data.data.id,
    };
    return userProfile;
  }
}

export const userService = new UserService();
