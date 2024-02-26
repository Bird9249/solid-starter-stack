import {
  IOffsetBasePaginate,
  IPaginated,
} from "../../../../common/interface/pagination";

export interface RoleTableState extends IOffsetBasePaginate {}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  permissions: { name: string }[];
}

export interface RolesResponse extends IPaginated {
  roles: RoleResponse[];
}
