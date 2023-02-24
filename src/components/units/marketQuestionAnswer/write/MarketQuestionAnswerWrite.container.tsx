// 중고마켓 댓글 등록 container

import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  CREATE_USED_ITEMS_QUESTION_ANSWER,
  UPDATE_USED_ITEMS_QUESTION_ANSWER,
} from "./MarketQuestionAnswerWrite.queries";
import { Modal, notification } from "antd";
import MarketQuestionAnswerWriteUI from "./MarketQuestionAnswerWrite.presenter";
import { FETCH_USED_ITEMS_QUESTION_ANSWERS } from "../list/MarketQuestiontAnswersList.queries";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
} from "../../../../../path/to/types/generated/types";
import { IMarketQuestionAnswerWrite } from "../../../../../path/to/types/components/units/types";

const MarketQuestionAnswerWrite = (pr: IMarketQuestionAnswerWrite) => {
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
    pr.setIsAnswerEdit(!pr.isAnswerEdit);
  };

  const onClickAnswer = async () => {
    try {
      await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: { contents },
          useditemQuestionId: String(pr.QuestionElID),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(pr.QuestionElID) },
          },
        ],
      });
      notification.success({
        // 로그인한 사람이름
        message: `대댓글 등록하였습니다.`,
      });
      pr.setIsAnswerEdit(!pr.isAnswerEdit);
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
          useditemQuestionAnswerId: String(pr.QuestionAnswerElID),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(pr.QuestionElID) },
          },
        ],
      });
      pr.setIsAnswerEdit(pr.isAnswerEdit);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <MarketQuestionAnswerWriteUI
      onChangeContents={onChangeContents}
      onClickCancel={onClickCancel}
      onClickAnswer={onClickAnswer}
      onClickUpdate={onClickUpdate}
      isAnswerEdit={pr.isAnswerEdit}
      contents={contents}
    />
  );
};

export default MarketQuestionAnswerWrite;
