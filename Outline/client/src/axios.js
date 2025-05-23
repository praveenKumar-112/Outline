// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ your backend server
  withCredentials: true,
});

export default instance;
