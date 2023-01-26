import { ApolloQueryResult } from "@apollo/client";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
  IUseditem,
} from "../../../../../path/to/types/generated/types";

// ================================================================
export interface IPropsPre {
  keyword?: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  isSoldout: boolean;
  BestProductData: IQuery | undefined;
  MarketsItemsData: Pick<IQuery, "fetchUseditems"> | undefined;
  MarketsItemsRefetch: (
    variables?: Partial<IQueryFetchUseditemsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditems">>>;
  onClickSoldItems: () => void;
  onClickSoldOutItems: () => void;
  onClickMoveToMarketDetail: (event: MouseEvent<HTMLElement>) => void;
  onLoadMore: () => void;
  onClicMarketsWrite: () => void;
}
// ================================================================

export interface IPropsStyle {
  isSoldout?: boolean;
  isMatched?: boolean;
}
// ================================================================

export interface IPropsBestProducts {
  key: string;
  el: IUseditem;
  onClickMoveToMarketDetail: (event: MouseEvent<HTMLElement>) => void;
}
// ================================================================

export interface IPropsPreItem {
  keyword?: string;
  key: string;
  el: IUseditem;
  onClickMoveToMarketDetail: (event: MouseEvent<HTMLElement>) => void;
}
