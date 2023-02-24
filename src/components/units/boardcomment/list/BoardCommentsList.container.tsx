import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchBoardCommentsArgs,
} from "../../../../../path/to/types/generated/types";
import BoardCommentsListUI from "./BoardCommentsList.presenter";
import { FETCH_BOARD_COMMENTS } from "./BoardCommentsList.queries";

const BoardsCommentList = () => {
  const router = useRouter();
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoardComments">,
    IQueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(router.query.boardId) },
  });

  const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardComments)
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return <BoardCommentsListUI data={data} onLoadMore={onLoadMore} />;
};

export default BoardsCommentList;
