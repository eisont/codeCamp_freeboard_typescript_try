// 중고마켓 댓글 목록 container

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../../path/to/types/generated/types";
import MarketCommentListUI from "./MarketCommentList.presenter";
import { FETCH_USED_ITEM_QUESTIONS } from "./MarketCommentList.queries";

const MarketCommentList = () => {
  const router = useRouter();

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: String(router.query.useditemId) },
  });

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditemQuestions.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchUseditemQuestions)
          return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };
        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  return <MarketCommentListUI data={data} onLoadMore={onLoadMore} />;
};

export default MarketCommentList;
