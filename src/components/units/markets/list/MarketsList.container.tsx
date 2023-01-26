// Markets 목록 Container

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchUseditemsArgs,
} from "../../../../../path/to/types/generated/types";
import MarketsListUI from "./MarketsList.presenter";
import {
  FETCH_USED_ITEMS,
  FETCH_USED_ITEMS_OF_THE_BEST,
} from "./MarketsList.query";

const MarketsList = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [isSoldout, setIsSoldOut] = useState(false);

  const { data: BestProductData } = useQuery<IQuery, "fetchUseditemsOfTheBest">(
    FETCH_USED_ITEMS_OF_THE_BEST
  );

  const onClickSoldItems = () => {
    setIsSoldOut(false);
  };
  const onClickSoldOutItems = () => {
    setIsSoldOut(true);
  };

  const {
    data: MarketsItemsData,
    refetch: MarketsItemsRefetch,
    fetchMore,
  } = useQuery<Pick<IQuery, "fetchUseditems">, IQueryFetchUseditemsArgs>(
    FETCH_USED_ITEMS,
    {
      variables: {
        isSoldout,
      },
    }
  );

  const onClickMoveToMarketDetail = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element) {
      router.push(`/markets/${event.currentTarget.id}`);
    }
  };

  const onLoadMore = () => {
    if (!MarketsItemsData) return;
    fetchMore({
      variables: {
        page: Math.ceil(MarketsItemsData?.fetchUseditems.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditems)
          return { fetchUseditemQuestions: [...prev.fetchUseditems] };

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  const onClicMarketsWrite = () => {
    router.push("/markets/new");
  };

  return (
    <MarketsListUI
      keyword={keyword}
      setKeyword={setKeyword}
      isSoldout={isSoldout}
      BestProductData={BestProductData}
      MarketsItemsData={MarketsItemsData}
      MarketsItemsRefetch={MarketsItemsRefetch}
      onClickSoldItems={onClickSoldItems}
      onClickSoldOutItems={onClickSoldOutItems}
      onClickMoveToMarketDetail={onClickMoveToMarketDetail}
      onLoadMore={onLoadMore}
      onClicMarketsWrite={onClicMarketsWrite}
    />
  );
};

export default MarketsList;
