// 중고마켓 댓글 목록 container

import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS_QUESTION_ANSWERS } from "./MarketQuestiontAnswersList.queries";
import MarketQuestionAnswersListUI from "./MarketQuestiontAnswersList.presenter";
import {
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../../path/to/types/generated/types";
import { IMarketQuestionAnswersList } from "../../../../../path/to/types/components/units/types";

const MarketQuestionAnswersList = (pr: IMarketQuestionAnswersList) => {
  const { data: UseditemQuestionAnswersData } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEMS_QUESTION_ANSWERS, {
    variables: { useditemQuestionId: String(pr.QuestionElID) }, // questions의 데이터를 사용
  });

  const onLoadMore = () => {
    // 데이터가 없으면 리턴
    if (!UseditemQuestionAnswersData) return <div />;
  };

  return (
    <MarketQuestionAnswersListUI
      UseditemQuestionAnswersData={UseditemQuestionAnswersData}
      onLoadMore={onLoadMore}
      QuestionElID={pr.QuestionElID}
    />
  );
};

export default MarketQuestionAnswersList;
