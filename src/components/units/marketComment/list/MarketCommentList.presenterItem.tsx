// 중고마켓 댓글 목록 수정창 component

import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, notification } from "antd";
import MarketCommentWrite from "../write/MarketCommentWrite.container";
import {
  DELETE_USED_ITEM_QUESTION,
  FETCH_USED_ITEM_QUESTIONS,
} from "./MarketCommentList.queries";
import * as S from "./MarketCommentList.styles";
import { getDateComma } from "../../../../commons/libraries/utils";
import MarketCommentAnswerWrite from "../../marketQuestionAnswer/write/MarketCommentAnswerWrite.container";
import MarketCommentAnswerList from "../../marketQuestionAnswer/list/MarketCommentAnswerList.container";
import {
  Closesvg,
  Pencilsvg,
  Questionsvg,
} from "../../../../commons/styles/Iconsvg";
import DOMPurify from "dompurify";
import UserInfoPicure from "../../../commons/Info/userInfoPicture";
import { IPropsPreItem } from "./MarketCommentList.types";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
} from "../../../../../path/to/types/generated/types";

const MarketCommentListUIItem = (pr: IPropsPreItem) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isEditSub, setIsEditSub] = useState(false);

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const onClickUpdate = () => {
    setIsEdit((prev) => !prev);
  };
  const onClickCreateAnswer = () => {
    setIsEditSub((prev) => !prev);
  };

  const onClickDelete = async () => {
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: String(pr.CommentEl?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: String(router.query.useditemId) },
          },
        ],
      });
      notification.error({
        message: `${pr.CommentEl?.contents} 댓글이 삭제되었습니다.`,
        placement: "topLeft",
      });
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <>
      {isEdit && (
        // 댓글 작성
        <MarketCommentWrite
          isEdit={true}
          setIsEdit={setIsEdit}
          CommentElID={pr.CommentEl?._id}
        />
      )}
      {!isEdit && (
        // 댓글 리스트
        <S.ItemWrapper>
          <S.FlexBox>
            <UserInfoPicure size="40" data={pr.CommentEl?.user?.picture} />

            <S.TitleBox>
              <S.UserName>{pr.CommentEl?.user?.name}</S.UserName>

              {typeof window !== "undefined" && (
                <S.Contents
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(pr.CommentEl?.contents)),
                  }}
                />
              )}

              <S.CreateAt>{getDateComma(pr.CommentEl?.createdAt)}</S.CreateAt>
            </S.TitleBox>
          </S.FlexBox>

          <S.BtBox>
            <S.Bt onClick={onClickCreateAnswer}>
              <Questionsvg
                margin="0 16px 0 0"
                width="20"
                height="20"
                fill="#bdbdbd"
              />
            </S.Bt>
            <S.Bt onClick={onClickUpdate}>
              <Pencilsvg
                margin="0 16px 0 0"
                width="18"
                height="18"
                fill="#bdbdbd"
              />
            </S.Bt>
            <S.Bt onClick={onClickDelete}>
              <Closesvg width="14" height="14" fill="#bdbdbd" />
            </S.Bt>
          </S.BtBox>
        </S.ItemWrapper>
      )}
      {isEditSub && (
        // 대댓글 작성
        <MarketCommentAnswerWrite
          isEditSub={true}
          setIsEditSub={setIsEditSub}
          CommentElID={pr.CommentEl?._id}
        />
      )}
      <MarketCommentAnswerList
        // 대댓글 리스트
        isEditSub={isEditSub}
        setIsEditSub={setIsEditSub}
        CommentElID={pr.CommentEl?._id}
      />
      <S.Hr />
    </>
  );
};

export default MarketCommentListUIItem;
