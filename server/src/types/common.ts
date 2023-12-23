export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ReactionType = "LIKE" | "COMMENT" | "POST";

export enum EReactionPoint {
  LIKE = 1,
  COMMENT = 3,
  POST = 5,
}

export enum ESocketEventName {
  "NOTIFICATION" = "NOTIFICATION",
  "LEVEL_UP" = "LEVEL_UP",
}

export interface ICount {
  type: string;
  count: number;
}

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
}

export type DataWithPagination<T> = IPagination & {
  data: T[];
};
