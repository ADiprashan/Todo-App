import axios from "axios";
import { API_URL } from "./Constants";
export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {
  executeBasicAuthenticationService(username, password) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: { authorization: this.createBasicAuthHeader(username, password) }
    });
  }

  executeJwtAuthenticationService(username, password) {
    return axios.post(`${API_URL}/authenticate`, {
      username,
      password
    });
  }

  createBasicAuthHeader(username, password) {
    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);
    return basicAuthHeader;
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptor(this.createBasicAuthHeader(username, password));
  }

  registerSuccessfulLoginForJwt(username, token) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setupAxiosInterceptor(this.createJwtToken(token));
  }

  createJwtToken(token) {
    let jwtToken = "Bearer " + token;
    return jwtToken;
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIN() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }

  getLoggedInUser() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptor(authHeader) {
    axios.interceptors.request.use(config => {
      if (this.isUserLoggedIN) {
        config.headers.authorization = authHeader;
      }
      return config;
    });
  }
}

export default new AuthenticationService();
