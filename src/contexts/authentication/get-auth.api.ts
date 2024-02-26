import { useAxios } from "../axios/AxiosContext";

export default async () => {
  const { axios } = useAxios();

  const token = localStorage.getItem("token");

  return await axios.get<{
    id: number;
    username: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
  }>("auth/me", {
    headers: { Authorization: "Bearer " + token },
  });
};
