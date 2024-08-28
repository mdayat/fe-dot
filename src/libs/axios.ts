import axios from "axios";
import axiosRetry from "axios-retry";

const controller = new AbortController();
const axiosInstance = axios.create({ signal: controller.signal });

axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    if (error.response === undefined && error.request === undefined) {
      return false;
    } else if (error.response === undefined) {
      return true;
    } else {
      if (error.response.status >= 500) {
        return true;
      } else {
        return false;
      }
    }
  },
});

export { axiosInstance };
