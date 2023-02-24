// 중고마켓 댓글 목록 수정창 component

import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal, notification } from "antd";
import MarketCommentWrite from "../write/MarketQuestionWrite.container";
import {
  DELETE_USED_ITEM_QUESTION,
  FETCH_USED_ITEM_QUESTIONS,
} from "./MarketQuestionsList.queries";
import * as S from "./MarketQuestionsList.styles";
import { getDateComma } from "../../../../commons/libraries/utils";
import MarketCommentAnswerWrite from "../../marketQuestionAnswer/write/MarketQuestionAnswerWrite.container";
import MarketCommentAnswerList from "../../marketQuestionAnswer/list/MarketQuestiontAnswersList.container";
import {
  Closesvg,
  Pencilsvg,
  Questionsvg,
} from "../../../../commons/styles/Iconsvg";
import DOMPurify from "dompurify";
import UserInfoPicure from "../../../commons/Info/userInfoPicture";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
} from "../../../../../path/to/types/generated/types";
import { IMarketQuestionsListUIItem } from "../../../../../path/to/types/components/units/types";

const MarketQuestionsListUIItem = (pr: IMarketQuestionsListUIItem) => {
  const router = useRouter();

  const [isQuestionEdit, setIsQuestionEdit] = useState(false);
  const [isAnswerEdit, setIsAnswerEdit] = useState(false);

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const onClickUpdate = () => {
    setIsQuestionEdit((prev) => !prev);
  };
  const onClickCreateAnswer = () => {
    setIsAnswerEdit((prev) => !prev);
  };

  const onClickDelete = async () => {
    try {
      await deleteUseditemQuestion({
        variables: {
          useditemQuestionId: String(pr.QuestionEl?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: String(router.query.useditemId) },
          },
        ],
      });
      notification.error({
        message: `${pr.QuestionEl?.contents} 댓글이 삭제되었습니다.`,
        placement: "topLeft",
      });
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  return (
    <>
      {isQuestionEdit && (
        // 댓글 작성
        <MarketCommentWrite
          isQuestionEdit={true}
          setIsQuestionEdit={setIsQuestionEdit}
          QuestionElID={pr.QuestionEl?._id}
        />
      )}

      {!isQuestionEdit && (
        // 댓글 리스트
        <S.ItemWrapper>
          <S.FlexBox>
            <UserInfoPicure size="40" data={pr.QuestionEl?.user?.picture} />

            <S.TitleBox>
              <S.UserName>{pr.QuestionEl?.user?.name}</S.UserName>

              {typeof window !== "undefined" && (
                <S.Contents
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(pr.QuestionEl?.contents)),
                  }}
                />
              )}

              <S.CreateAt>{getDateComma(pr.QuestionEl?.createdAt)}</S.CreateAt>
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

      {isAnswerEdit && (
        // 대댓글 작성
        <MarketCommentAnswerWrite
          isAnswerEdit={true}
          setIsAnswerEdit={setIsAnswerEdit}
          QuestionElID={pr.QuestionEl?._id}
        />
      )}

      <MarketCommentAnswerList
        // 대댓글 리스트
        QuestionElID={pr.QuestionEl?._id}
      />
      <S.Hr />
    </>
  );
};

export default MarketQuestionsListUIItem;
