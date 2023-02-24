// 중고마켓 댓글 목록 수정창 component

// import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Modal, notification } from "antd";
import * as S from "./MarketQuestiontAnswersList.styles";
import {
  DELETE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEMS_QUESTION_ANSWERS,
} from "./MarketQuestiontAnswersList.queries";
import { useMutation } from "@apollo/client";
import MarketCommentAnswerWrite from "../write/MarketQuestionAnswerWrite.container";
import {
  AnswerArrow,
  Closesvg,
  Pencilsvg,
} from "../../../../commons/styles/Iconsvg";
import DOMPurify from "dompurify";
import UserInfoPicure from "../../../commons/Info/userInfoPicture";
import {
  IMutation,
  IMutationDeleteUseditemQuestionAnswerArgs,
} from "../../../../../path/to/types/generated/types";
import { IMarketQuestionAnswersListUIItem } from "../../../../../path/to/types/components/units/types";

const MarketQuestionAnswersListUIItem = (
  pr: IMarketQuestionAnswersListUIItem
) => {
  const [isAnswerEdit, setIsAnswerEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);

  const onClickUpdate = () => {
    setIsAnswerEdit(!isAnswerEdit);
    setIsUpdate(!isUpdate);
  };

  const onClickDelete = async () => {
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: String(pr.QuestionAnswerEl?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(pr?.QuestionElID) },
          },
        ],
      });
      notification.error({
        message: `${pr.QuestionAnswerEl?.contents} 대댓글이 삭제되었습니다.`,
        placement: "topLeft",
      });
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <>
      {isAnswerEdit && (
        // 대댓글 수정
        <MarketCommentAnswerWrite
          isAnswerEdit={!isAnswerEdit}
          setIsAnswerEdit={setIsAnswerEdit}
          QuestionAnswerElID={pr.QuestionAnswerEl?._id}
        />
      )}

      {!isAnswerEdit && (
        // 대댓글 리스트
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
              data={pr.QuestionAnswerEl?.user?.picture}
            />

            <S.ContentsBox>
              <S.Name>{pr.QuestionAnswerEl?.user?.name}</S.Name>

              {typeof window !== "undefined" && (
                <S.Contents
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      String(pr.QuestionAnswerEl?.contents)
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
    </>
  );
};

export default MarketQuestionAnswersListUIItem;
