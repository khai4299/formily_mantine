import { BaseReponse } from './baseReponse';

export interface Pagination<T = any> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type PagingResponse<T> = BaseReponse<Pagination<T>>;
