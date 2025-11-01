import axios from "axios";

// Use localhost instead of backend for browser access
const baseURL = "http://localhost:5000";

const instance = axios.create({
  baseURL,
  withCredentials: false,
});

export default instance;
