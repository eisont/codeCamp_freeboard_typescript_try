// 중고마켓 댓글 목록 presenter
import InfiniteScroll from "react-infinite-scroller";
import MarketCommentListUIItem from "./MarketCommentList.presenterItem";
import { v4 as uuidv4 } from "uuid";
import { IPropsPre } from "./MarketCommentList.types";

const MarketCommentListUI = (pr: IPropsPre) => {
  if (!pr.data) return <div />;

  return (
    <InfiniteScroll pageStart={0} loadMore={pr.onLoadMore} hasMore={true}>
      {pr.data?.fetchUseditemQuestions?.map((CommentEl) => (
        <MarketCommentListUIItem key={uuidv4()} CommentEl={CommentEl} />
      ))}
    </InfiniteScroll>
  );
};

export default MarketCommentListUI;
