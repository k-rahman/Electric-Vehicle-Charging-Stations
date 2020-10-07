import http from './httpService';

const outletsAPI = process.env.REACT_APP_OUTLETS;

export function getOutletsByStationId(stationId) {
  return http.get(`${outletsAPI}/${stationId}`);
};