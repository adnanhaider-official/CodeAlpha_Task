import axios from "axios";

// Central axios instance for talking to the backend.
// withCredentials is required so the httpOnly "token" cookie
// set by the backend (login/register) is sent on every request.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export default api;
