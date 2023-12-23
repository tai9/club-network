import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DataWithPagination<T> = IPagination & {
  data: T[];
};

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
  count: number;
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
