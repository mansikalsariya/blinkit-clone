import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

// Axios instance
const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

// ====================
// Request Interceptor
// ====================
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ====================
// Response Interceptor
// ====================
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

// ====================
// Refresh Access Token
// ====================
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    });

    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      localStorage.setItem("accesstoken", accessToken);
      return accessToken;
    }
    return null;
  } catch (error) {
    console.error("Refresh Token Failed:", error);
    return null;
  }
};

export default Axios;
