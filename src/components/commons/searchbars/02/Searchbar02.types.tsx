import { ApolloQueryResult } from "@apollo/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../../../path/to/types/generated/types";

export interface IPropsCon {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
  setKeyword: Dispatch<SetStateAction<string>>;

  startDate: String;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: String;
  setEndDate: Dispatch<SetStateAction<string>>;
}

export interface ISearchbars02UIProps {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onClickSearch: (data: any) => void;
  onChangeStartDate: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchType {
  search: String;
  startDate?: String;
  endDate?: String;
}
