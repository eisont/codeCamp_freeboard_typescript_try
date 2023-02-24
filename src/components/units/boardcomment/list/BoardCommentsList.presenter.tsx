// 게시판 댓글 목록 presenter

import InfiniteScroll from "react-infinite-scroller";
import { IBoardCommentsListUI } from "../../../../../path/to/types/components/units/types";
import BoardCommentsListUIItem from "./BoardCommentsList.presenterItem";

const BoardCommentsListUI = (pr: IBoardCommentsListUI) => {
  if (!pr.data) return <div />;
  return (
    <InfiniteScroll pageStart={0} loadMore={pr.onLoadMore} hasMore={true}>
      {pr.data?.fetchBoardComments.map((BoardCommentEl) => (
        <BoardCommentsListUIItem
          key={BoardCommentEl._id}
          BoardCommentEl={BoardCommentEl}
        />
      ))}
    </InfiniteScroll>
  );
};

export default BoardCommentsListUI;
