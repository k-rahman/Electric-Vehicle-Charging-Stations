import http from './httpService';


const locationsAPI = process.env.REACT_APP_LOCATIONS;

    export function getLocations() {
      return http.get(locationsAPI);
    }

    export function getLocationById(locationId) {
      return http.get(`${locationsAPI}/${locationId}`);
    }