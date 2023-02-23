// 중고마켓 댓글 목록 수정창 component

// import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Modal, notification } from "antd";
import * as S from "./MarketCommentAnswerList.styles";
import {
  DELETE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEMS_QUESTION_ANSWERS,
} from "./MarketCommentAnswerList.queries";
import { useMutation } from "@apollo/client";
import MarketCommentAnswerWrite from "../write/MarketCommentAnswerWrite.container";
import MarketCommentAnswerEdit from "../../marketQuestionAnswerEdit/Edit/MarketCommentAnswerEdit.container";
import {
  AnswerArrow,
  Closesvg,
  Pencilsvg,
} from "../../../../commons/styles/Iconsvg";
import DOMPurify from "dompurify";
import UserInfoPicure from "../../../commons/Info/userInfoPicture";
import { IPropsCommentAnswerListItem } from "./MarketCommentAnswerList.types";
import {
  IMutation,
  IMutationDeleteUseditemQuestionAnswerArgs,
} from "../../../../../path/to/types/generated/types";

const MarketCommentAnswerListUIItem = (pr: IPropsCommentAnswerListItem) => {
  const [isEditSub, setIsEditSub] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);

  const onClickUpdate = () => {
    setIsEditSub(!isEditSub);
    setIsUpdate(!isUpdate);
  };

  const onClickDelete = async () => {
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: String(pr.CommentAnswerEl?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(pr?.CommentAnswerEl) },
          },
        ],
      });
      notification.error({
        message: `${pr.CommentAnswerEl?.contents} 대댓글이 삭제되었습니다.`,
        placement: "topLeft",
      });
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <>
      {!isEditSub && (
        <S.ItemWrapper>
          <S.Box>
            <AnswerArrow
              margin="0 24px 0 60px"
              width="15"
              height="17"
              fill="#000"
            />
            <UserInfoPicure
              size="40"
              data={pr.CommentAnswerEl?.user?.picture}
            />

            <S.ContentsBox>
              <S.Name>{pr.CommentAnswerEl?.user?.name}</S.Name>

              {typeof window !== "undefined" && (
                <S.Contents
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      String(pr.CommentAnswerEl?.contents)
                    ),
                  }}
                />
              )}
            </S.ContentsBox>
          </S.Box>

          <S.OptionWrapper>
            <S.UpdateBt onClick={onClickUpdate}>
              <Pencilsvg
                margin="0 16px 0 0"
                width="18"
                height="18"
                fill="#bdbdbd"
              />
            </S.UpdateBt>
            <S.DeleteBt onClick={onClickDelete}>
              <Closesvg
                margin="0 16px 0 0"
                width="18"
                height="18"
                fill="#bdbdbd"
              />
            </S.DeleteBt>
          </S.OptionWrapper>
        </S.ItemWrapper>
      )}
      {isEditSub && (
        <MarketCommentAnswerWrite
          isEditSub={!isEditSub}
          setIsEditSub={setIsEditSub}
          CommentAnswerEl={pr.CommentAnswerEl}
        />
      )}
      {isUpdate && (
        <MarketCommentAnswerEdit
          CommentAnswerEl={pr.CommentAnswerEl}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      )}
    </>
  );
};

export default MarketCommentAnswerListUIItem;
