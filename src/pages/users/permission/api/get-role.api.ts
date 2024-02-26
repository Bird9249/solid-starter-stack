import { useAxios } from "../../../../contexts/axios/AxiosContext";
import { RoleTableState, RolesResponse } from "./permission.interface";

export default async (state: RoleTableState) => {
  const { axios } = useAxios();

  return axios.get<RolesResponse>("/roles", {
    params: { limit: state.limit, skip: state.offset },
  });
};
