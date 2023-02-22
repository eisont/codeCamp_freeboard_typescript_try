import { ApolloQueryResult } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchPointTransactionsOfBuyingArgs,
  IQueryFetchPointTransactionsOfLoadingArgs,
  IQueryFetchPointTransactionsOfSellingArgs,
  IQueryFetchUseditemsIPickedArgs,
  IQueryFetchUseditemsISoldArgs,
} from "../../../../../path/to/types/generated/types";

export interface IPropsCon {
  data: number | undefined;
  refetch: (
    variables?:
      | Partial<IQueryFetchUseditemsIPickedArgs>
      | Partial<IQueryFetchUseditemsISoldArgs>
      | Partial<IQueryFetchBoardsArgs>
      | Partial<IQueryFetchPointTransactionsOfBuyingArgs>
      | Partial<IQueryFetchPointTransactionsOfLoadingArgs>
      | Partial<IQueryFetchPointTransactionsOfSellingArgs>
      | undefined
  ) =>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsIPicked">>>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsISold">>>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchPointTransactionsOfBuying">>>
    | Promise<
        ApolloQueryResult<Pick<IQuery, "fetchPointTransactionsOfLoading">>
      >
    | Promise<
        ApolloQueryResult<Pick<IQuery, "fetchPointTransactionsOfSelling">>
      >;
}

// ==================================================================
export interface IPropsPre {
  startPage: number;
  lastPage: number;
  activedPage: number;
  onClickPage: (id: string) => (_: any) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
