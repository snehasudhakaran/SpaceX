import axios from 'axios';

const API_URL = 'https://api.spacexdata.com/v4';

const cache = {};

const getData = async (endpoint, forceRefresh = false) => {
  if (cache[endpoint] && !forceRefresh) {
    return cache[endpoint];
  }

  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    cache[endpoint] = response; 
    return response;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error; 
  }
};

export const getCompanyData = (forceRefresh = false) => getData('/company', forceRefresh);
export const getRockets = (forceRefresh = false) => getData('/rockets', forceRefresh);
export const getRocketById = (id, forceRefresh = false) => getData(`/rockets/${id}`, forceRefresh);
export const getLaunchData = (forceRefresh = false) => getData('/launches', forceRefresh);
export const getHistory = (forceRefresh = false) => getData('/history', forceRefresh);
export const getStarlinkData = (forceRefresh = false) => getData('/starlink', forceRefresh);