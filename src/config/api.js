const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE || "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000, // 30 seconds
  withCredentials: true, // for handling cookies
};

export default API_CONFIG;
