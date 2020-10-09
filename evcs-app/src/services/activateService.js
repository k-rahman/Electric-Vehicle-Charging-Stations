import http from './httpService';

const activateAPI = process.env.REACT_APP_ACTIVATE

export function activate(code) {
  return http.get(`${activateAPI}/${code}`);
}