import { IOffsetBasePaginate, IPaginated } from "../../../../common/interface/pagination";

export interface UserTableState extends IOffsetBasePaginate {
  search: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface UsersResponse extends IPaginated {
  users: UserResponse[];
}
