import { useMutation, useQuery } from "@apollo/client";
import { Modal, notification } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { IBoardCommentWrite } from "../../../../../path/to/types/components/units/types";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
  IMutationUpdateBoardCommentArgs,
  IQuery,
} from "../../../../../path/to/types/generated/types";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentsList.queries";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import {
  CREATE_BOARD_COMMENT,
  FETCH_USER_LOGGED_IN,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries";

const BoardCommentWrite = (pr: IBoardCommentWrite) => {
  const { data: LoggedInUserData } = useQuery<IQuery, "fetchUserLoggedIn">(
    FETCH_USER_LOGGED_IN
  );
  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation<
    Pick<IMutation, "updateBoardComment">,
    IMutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);

  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const onChangeStar = (value: number) => {
    setStar(value);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickSubmit = async () => {
    if (!writer) {
      alert("작성자를 입력해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const result = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: star,
          },
          boardId: String(router.query.boardId),
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      notification.open({
        message: `${result.data?.createBoardComment.writer}님이 댓글 등록하였습니다.`,
      });
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  const onClickCancel = () => {
    pr.setIsEdit((prev) => !prev);
  };

  const onClickUpdate = async () => {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    if (!password) {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    try {
      if (!pr.BoardCommentEl?._id) return;

      const updateBoardCommentInput = { contents: "", rating: 0 };
      if (contents) updateBoardCommentInput.contents = contents;
      if (star !== pr.BoardCommentEl?.rating)
        updateBoardCommentInput.rating = star;

      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: pr.BoardCommentEl?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      pr.setIsEdit(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <BoardCommentWriteUI
      LoggedInUserData={LoggedInUserData}
      onChangeStar={onChangeStar}
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      onClickCancel={onClickCancel}
      onClickUpdate={onClickUpdate}
      contents={contents}
      writer={writer}
      password={password}
      isEdit={pr.isEdit}
    />
  );
};

export default BoardCommentWrite;
