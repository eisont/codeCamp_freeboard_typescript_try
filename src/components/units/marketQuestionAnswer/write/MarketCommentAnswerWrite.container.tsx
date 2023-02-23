// 중고마켓 댓글 등록 container

import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  CREATE_USED_ITEMS_QUESTION_ANSWER,
  UPDATE_USED_ITEMS_QUESTION_ANSWER,
} from "./MarketCommentAnswerWrite.queries";
import { Modal, notification } from "antd";
import MarketCommentAnswerWriteUI from "./MarketCommentAnswerWrite.presenter";
import { FETCH_USED_ITEMS_QUESTION_ANSWERS } from "../list/MarketCommentAnswerList.queries";
import { IPropsAnswerWrite } from "./MarketCommentAnswerWrite.types";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
} from "../../../../../path/to/types/generated/types";

const MarketCommentAnswerWrite = (pr: IPropsAnswerWrite) => {
  const [contents, setContents] = useState("");

  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEMS_QUESTION_ANSWER);

  const [updateUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEMS_QUESTION_ANSWER);

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickCancel = () => {
    pr.setIsEditSub(!pr.isEditSub);
  };

  const onClickAnswer = async () => {
    try {
      await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: { contents },
          useditemQuestionId: String(pr.CommentElID),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(pr.CommentElID) },
          },
        ],
      });
      notification.success({
        // 로그인한 사람이름
        message: `대댓글 등록하였습니다.`,
      });
      pr.setIsEditSub(!pr.isEditSub);
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = async () => {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      // id가 없을때 바로 return
      const updateUseditemQuestionAnswerInput = { contents: "" };
      if (contents) updateUseditemQuestionAnswerInput.contents = contents;

      await updateUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput,
          useditemQuestionAnswerId: String(pr.CommentAnswerEl?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(pr.CommentElID) },
          },
        ],
      });
      pr.setIsEditSub(!pr.isEditSub);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <MarketCommentAnswerWriteUI
      onChangeContents={onChangeContents}
      onClickCancel={onClickCancel}
      onClickAnswer={onClickAnswer}
      onClickUpdate={onClickUpdate}
      isEditSub={pr.isEditSub}
      contents={contents}
    />
  );
};

export default MarketCommentAnswerWrite;
