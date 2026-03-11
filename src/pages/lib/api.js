import axios from "axios";
import { auth } from "./firebase"; // Como estão na mesma pasta 'lib', usa-se ./

const API_URL = "https://us-central1-pet-e-saude.cloudfunctions.net/api";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para anexar o token
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userServices = {
  cadastrarPerfil: (dados) => api.post("/usuarios", dados),
  getMe: (uid) => api.get(`/usuarios/${uid}`),
};

export default api;