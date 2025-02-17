import axios, { AxiosInstance } from "axios";
import { AuthHeaders } from "../types/auth";

export class ApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  setAuthHeaders(headers: AuthHeaders) {
    this.api.defaults.headers.common["access-token"] = headers["access-token"];
    this.api.defaults.headers.common["client"] = headers.client;
    this.api.defaults.headers.common["uid"] = headers.uid;
    this.api.defaults.headers.common["expiry"] = headers.expiry;
  }
}
