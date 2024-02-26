import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { UserTableState, UsersResponse } from "./user.interface";

export default async (state: UserTableState) => {
  const { axios } = useAxios();

  return axios.get<UsersResponse>("/users/search", {
    params: { limit: state.limit, skip: state.offset, q: state.search },
  });
};
