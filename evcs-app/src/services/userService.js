import http from './httpService';

const usersAPI = process.env.REACT_APP_USERS;

export function register(user){
  return http.post(usersAPI, {
         name: user.name,
         email: user.email,
         password: user.password,
      });
}