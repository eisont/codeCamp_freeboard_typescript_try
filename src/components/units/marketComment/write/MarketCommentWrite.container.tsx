// 중고마켓 댓글 등록 container

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
  CREATE_USED_ITEM_QUESTION,
  UPDATE_USED_ITEM_QUESTION,
} from "./MarketCommentWrite.queries";
import {
  FETCH_USED_ITEM_QUESTIONS,
  FETCH_USER_LOGGED_IN,
} from "../list/MarketCommentList.queries";
import { Modal, notification } from "antd";
import MarketCommentWriteUI from "./MarketCommentWrite.presenter";
import { IPropsCommentWrite } from "./MarketCommentWrite.types";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionArgs,
  IQuery,
} from "../../../../../path/to/types/generated/types";

const MarketCommentWrite = (pr: IPropsCommentWrite) => {
  const router = useRouter();
  const [contents, setContents] = useState("");

  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);

  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);

  const { data: UserLoggedInData } = useQuery<IQuery, "fetchUserLoggedIn">(
    FETCH_USER_LOGGED_IN
  );

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickCancel = () => {
    pr.setIsEdit?.(false);
  };

  // 상세보기 댓글창 등록하기 버튼
  const onClickComment = async () => {
    try {
      await createUseditemQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents,
          },
          useditemId: String(router.query.useditemId),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      notification.success({
        // 로그인한 사람이름
        message: `${UserLoggedInData?.fetchUserLoggedIn.name}님이 댓글 등록하였습니다.`,
      });
    } catch (errors: any) {
      Modal.error({ content: errors.message });
    }
  };

  const onClickUpdate = async () => {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      // id가 없을때 바로 return
      const updateUseditemQuestionInput = { contents: "" };
      if (contents) updateUseditemQuestionInput.contents = contents;

      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput,
          useditemQuestionId: String(pr.CommentElID),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: String(router.query.useditemId) },
          },
        ],
      });
      pr.setIsEdit?.(false);
    } catch (errors: any) {
      alert(errors.message);
    }
  };

  return (
    <MarketCommentWriteUI
      onChangeContents={onChangeContents}
      onClickCancel={onClickCancel}
      onClickComment={onClickComment}
      onClickUpdate={onClickUpdate}
      isEdit={pr.isEdit}
      contents={contents}
    />
  );
};

export default MarketCommentWrite;
