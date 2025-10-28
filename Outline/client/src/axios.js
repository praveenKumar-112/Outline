// src/axios.js
import axios from "axios";

// Use local server for development and production
const baseURL = "http://localhost:5000";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: false,
});

export default instance;
