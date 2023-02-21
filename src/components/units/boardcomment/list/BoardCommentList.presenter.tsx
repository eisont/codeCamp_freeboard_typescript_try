// 게시판 댓글 목록 presenter

import InfiniteScroll from "react-infinite-scroller";
import BoardCommentListUIItem from "./BoardCommentList.presenterItem";
import { IPropsPre } from "./BoardCommentList.types";

const BoardCommentListUI = (pr: IPropsPre) => {
  if (!pr.data) return <div />;
  return (
    <InfiniteScroll pageStart={0} loadMore={pr.onLoadMore} hasMore={true}>
      {pr.data?.fetchBoardComments.map((el) => (
        <BoardCommentListUIItem key={el._id} el={el} />
      ))}
    </InfiniteScroll>
  );
};

export default BoardCommentListUI;
