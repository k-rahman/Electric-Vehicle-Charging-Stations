import http from "./httpService";

const authAPI = process.env.REACT_APP_AUTH;

export function login(email, password) {
  return http.post(authAPI, {}, {
    auth: {
      username: email,
      password
    }
  })
}