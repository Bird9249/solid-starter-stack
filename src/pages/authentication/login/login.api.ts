import axios from "axios";
import { LoginForm } from "./login.schema";

export default async (form: LoginForm) => {
  const res = await axios.post<{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  }>(`${import.meta.env.VITE_BASE_API_URL}auth/login`, form);

  localStorage.setItem("token", res.data.token);

  return res.data;
};
