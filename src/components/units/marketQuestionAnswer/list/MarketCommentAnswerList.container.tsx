// 중고마켓 댓글 목록 container

import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS_QUESTION_ANSWERS } from "./MarketCommentAnswerList.queries";
import MarketCommentAnswerListUI from "./MarketCommentAnswerList.presenter";
import { IPropsCommentAnswerList } from "./MarketCommentAnswerList.types";
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../../path/to/types/generated/types";

const MarketCommentAnswerList = (pr: IPropsCommentAnswerList) => {
  const { data: UseditemQuestionAnswersData } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEMS_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: String(pr.CommentElID) }, // questions의 데이터를 사용
  });

  const onLoadMore = () => {
    // 데이터가 없으면 리턴
    if (!UseditemQuestionAnswersData) return <div />;
  };

  return (
    <MarketCommentAnswerListUI
      isEditSub={pr.isEditSub}
      setIsEditSub={pr.setIsEditSub}
      UseditemQuestionAnswersData={UseditemQuestionAnswersData}
      onLoadMore={onLoadMore}
      CommentElID={pr.CommentElID}
    />
  );
};

export default MarketCommentAnswerList;
