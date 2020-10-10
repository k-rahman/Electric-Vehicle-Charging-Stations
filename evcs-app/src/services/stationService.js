import http from './httpService';

const locationAPI = process.env.REACT_APP_LOCATIONS;

export function getStationsByLocationId(locationId) {
  return http.get(`${locationAPI}/${locationId}/stations`);
}