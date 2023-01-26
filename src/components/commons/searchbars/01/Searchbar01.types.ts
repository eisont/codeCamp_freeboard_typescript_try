import { ApolloQueryResult } from "@apollo/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../../../path/to/types/generated/types";

export interface IPropsCon {
  setKeyword: Dispatch<SetStateAction<string>>;
  refetch: (
    variables?: Partial<IQueryFetchUseditemsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditems">>>;
}

export interface IPropsPre {
  onChangeSearchbar: (event: ChangeEvent<HTMLInputElement>) => void;
}
