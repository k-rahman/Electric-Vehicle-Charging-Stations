import http from './httpService';

const activateAPI = process.env.REACT_APP_ACTIVATE

export function activate(code, locationId) {
  return http.get(activateAPI, {params: {
    locationId,
    code
  }});
}