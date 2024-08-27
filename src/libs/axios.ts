import axios from "axios";
import axiosRetry from "axios-retry";

import { getUserIDToken } from "../utils";

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
      if (error.response.status === 401) {
        return true;
      } else if (error.response.status >= 500) {
        return true;
      } else {
        return false;
      }
    }
  },
  onRetry: async (retryCount, error, req) => {
    if (retryCount === 1 && error.response && error.response.status === 401) {
      let idToken = "";
      try {
        idToken = await getUserIDToken();
      } catch (error) {
        console.error(
          new Error("Error when get user ID token: ", { cause: error })
        );
      }

      req.headers = { ...req.headers, Authorization: `Bearer ${idToken}` };
    }

    if (retryCount === 2 && error.response && error.response.status === 401) {
      controller.abort();
      throw error;
    }
  },
});

export { axiosInstance };
