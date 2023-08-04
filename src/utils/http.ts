import axios from "axios";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: "https://apicontroleempresarial-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
