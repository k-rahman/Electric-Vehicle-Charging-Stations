import http from './httpService';

const stationsAPI = process.env.REACT_APP_STATIONS;

export function getStationsByLocationId(locationId) {
  return http.get(`${stationsAPI}/${locationId}`);
}