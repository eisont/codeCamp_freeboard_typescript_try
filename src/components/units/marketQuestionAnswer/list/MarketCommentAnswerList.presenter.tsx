// 중고마켓 댓글 목록 presenter

import InfiniteScroll from "react-infinite-scroller";
import MarketCommentAnswerListUIItem from "./MarketCommentAnswerList.presenterItem";
import { IPropsCommentAnswerListPre } from "./MarketCommentAnswerList.types";

const MarketCommentAnswerListUI = (pr: IPropsCommentAnswerListPre) => {
  if (!pr.UseditemQuestionAnswersData) return <div />;

  return (
    <InfiniteScroll pageStart={0} loadMore={pr.onLoadMore} hasMore={true}>
      {pr.UseditemQuestionAnswersData?.fetchUseditemQuestionAnswers.map(
        (CommentAnswerEl) => (
          <MarketCommentAnswerListUIItem
            key={CommentAnswerEl._id}
            CommentAnswerEl={CommentAnswerEl}
            CommentElID={pr.CommentElID}
          />
        )
      )}
    </InfiniteScroll>
  );
};

export default MarketCommentAnswerListUI;
