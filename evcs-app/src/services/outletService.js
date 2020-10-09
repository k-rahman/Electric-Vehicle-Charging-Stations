import http from './httpService';

const outletsAPI = process.env.REACT_APP_OUTLETS;

export function getOutletById(outletId) {
  return http.get(`${outletsAPI}/${outletId}`);
}

export function getOutletsByStationId(stationId) {
  return http.get(`${outletsAPI}/${stationId}`);
};

export function updateOutletStatus(outlet) {
  return http.put(`${outletsAPI}/${outlet.id}`);
}