import axios, { AxiosInstance } from "axios";
import { AuthHeaders } from "../types/auth";

export class ApiService {
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
  }

  //TODO: Implement headers to all the instances of the api to avoid repeating code
  setAuthHeaders(headers: AuthHeaders) {
    this.api.defaults.headers.common["access-token"] = headers["access-token"];
    this.api.defaults.headers.common["client"] = headers.client;
    this.api.defaults.headers.common["uid"] = headers.uid;
    this.api.defaults.headers.common["expiry"] = headers.expiry;
  }
}
