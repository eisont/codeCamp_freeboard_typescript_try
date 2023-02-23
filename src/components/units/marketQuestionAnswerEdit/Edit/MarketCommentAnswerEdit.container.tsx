// 중고마켓 댓글 등록 container

import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { UPDATE_USED_ITEMS_QUESTION_ANSWER } from "./MarketCommentAnswerEdit.queries";
import MarketCommentAnswerUpdateUI from "./MarketCommentAnswerEdit.presenter";
import { FETCH_USED_ITEMS_QUESTION_ANSWERS } from "../../marketQuestionAnswer/list/MarketCommentAnswerList.queries";
import { IPropsMarketCommentAnswerUpdate } from "./MarketCommentAnswerEdit.types";

const MarketCommentAnswerEdit = (pr: IPropsMarketCommentAnswerUpdate) => {
  const [contents, setContents] = useState("");

  const [updateUseditemQuestionAnswer] = useMutation(
    UPDATE_USED_ITEMS_QUESTION_ANSWER
  );

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
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
            variables: { useditemQuestionId: String(pr.CommentAnswerEl?._id) },
          },
        ],
      });
      pr.setIsUpdate(!pr.isUpdate);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <MarketCommentAnswerUpdateUI
      onChangeContents={onChangeContents}
      onClickUpdate={onClickUpdate}
      isUpdate={pr.isUpdate}
      CommentAnswerEl={pr.CommentAnswerEl}
      contents={contents}
    />
  );
};

export default MarketCommentAnswerEdit;
