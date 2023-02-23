// 게시판 상세보기 container

import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import BoardDetailUI from "./BoardDetail.presenter";
import { Modal } from "antd";
import {
  DELETE_BOARD,
  FETCH_BOARD,
  LIKE_BOARD,
  DISLIKE_BOARD,
} from "./BoardDetail.query";
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IMutationDislikeBoardArgs,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../../path/to/types/generated/types";

const BoardDetail = () => {
  const router = useRouter();
  const { data: fetchBoardData } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: { boardId: String(router.query.boardId) },
  });

  const ImageCheck = fetchBoardData?.fetchBoard?.images?.filter((el) => el);

  const youtubeCheck =
    fetchBoardData?.fetchBoard?.youtubeUrl?.split(".").includes("youtube") ||
    fetchBoardData?.fetchBoard?.youtubeUrl?.split("/").includes("youtu.be");

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickLikeCount = () => {
    likeBoard({
      variables: {
        boardId: String(router.query.boardId),
      },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: {
            boardId: router.query.boardId,
          },
        },
      ],
    });
  };

  const [dislikeBoard] = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD);

  const onClickDisLikeCount = () => {
    dislikeBoard({
      variables: {
        boardId: String(router.query.boardId),
      },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: {
            boardId: router.query.boardId,
          },
        },
      ],
    });
  };

  const onClickMoveToBoardList = () => {
    router.push("/boards");
  };

  const onClickMoveToBoardEdit = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);

  const onClickDelete = async () => {
    try {
      await deleteBoard({
        variables: { boardId: String(router.query.boardId) },
      });
      Modal.success({ content: "게시물이 삭제되었습니다." });
      router.push("/boards");
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <BoardDetailUI
      fetchBoardData={fetchBoardData}
      ImageCheck={ImageCheck}
      youtubeCheck={youtubeCheck}
      onClickLikeCount={onClickLikeCount}
      onClickDisLikeCount={onClickDisLikeCount}
      onClickMoveToBoardList={onClickMoveToBoardList}
      onClickMoveToBoardEdit={onClickMoveToBoardEdit}
      onClickDelete={onClickDelete}
    />
  );
};

export default BoardDetail;
