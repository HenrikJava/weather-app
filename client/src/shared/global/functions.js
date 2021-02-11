import axios from "axios";

export const calcTime = (offset, sunTime) => {
  let timeNow;
  if (sunTime) {
    timeNow = new Date(sunTime * 1000);
  } else timeNow = new Date();
  const localComparingToUTC =
    timeNow.getTime() + timeNow.getTimezoneOffset() * 60000;
  return new Date(localComparingToUTC + 1000 * offset);
};
export const scale = (fahrenheitOn) => {
  if (fahrenheitOn) {
    return `°F`;
  } else return `°C`;
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
