import http from './httpService';

const historyAPI = process.env.REACT_APP_HISTORY;

export function getHistoryByUserId(userId) {
  return http.get(`${historyAPI}/${userId}`);
}

export function saveChargeInfo(info) {
  const {time, duration, energy, cost, user, location } = info;
  return http.post(historyAPI, {
    time,
    duration,
    energy,
    cost,
    user,
    location
  });
}