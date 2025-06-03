// utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adapte à ton backend
  withCredentials: true, // si tu utilises les cookies pour l’auth
});

export default api;
