import { IOrderBy } from "./order-by";

export interface IOffsetBasePaginate extends IOrderBy {
  offset?: number;
  limit?: number;
}

export interface IPaginated {
  total: number;
}
