// 중고마켓 댓글 목록 presenter

import InfiniteScroll from "react-infinite-scroller";
import { IMarketQuestionAnswersListUI } from "../../../../../path/to/types/components/units/types";
import MarketQuestionAnswersListUIItem from "./MarketQuestiontAnswersList.presenterItem";

const MarketQuestionAnswersListUI = (pr: IMarketQuestionAnswersListUI) => {
  if (!pr.UseditemQuestionAnswersData) return <div />;

  return (
    <InfiniteScroll pageStart={0} loadMore={pr.onLoadMore} hasMore={true}>
      {pr.UseditemQuestionAnswersData?.fetchUseditemQuestionAnswers.map(
        (QuestionAnswerEl) => (
          <MarketQuestionAnswersListUIItem
            key={QuestionAnswerEl._id}
            QuestionElID={pr.QuestionElID}
            QuestionAnswerEl={QuestionAnswerEl}
          />
        )
      )}
    </InfiniteScroll>
  );
};

export default MarketQuestionAnswersListUI;
