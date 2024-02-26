import { IPaginated } from "../../../../common/interface/pagination";

export interface PermissionResponse {
  group_name: string;
  items: {
    id: number;
    name: string;
    description: string;
  }[];
}

export interface PermissionsResponse extends IPaginated {
  permissions: PermissionResponse[];
}
