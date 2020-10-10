import http from './httpService';

const outletsAPI = process.env.REACT_APP_OUTLETS;
const locationAPI = process.env.REACT_APP_LOCATIONS;

export function getOutletById(outletId) {
  return http.get(`${outletsAPI}/${outletId}`);
}

export function getOutletsByStationId(stationId) {
  return http.get(`${locationAPI}/${stationId}/outlets`);
};

export function updateOutletStatus(outlet) {
  return http.put(`${outletsAPI}/${outlet.id}`);
}