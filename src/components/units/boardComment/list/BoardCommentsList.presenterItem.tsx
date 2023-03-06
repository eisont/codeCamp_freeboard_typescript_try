// 게시판 댓글 수정창 페이지

import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Modal } from "antd";
import BoardCommentWrite from "../write/BoardCommentWrite.container";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoardCommentsList.queries";
import * as S from "./BoardCommentsList.styles";
import { getDateComma } from "../../../../commons/libraries/utils";
import {
  Closesvg,
  Pencilsvg,
  Profilesvg,
} from "../../../../commons/styles/Iconsvg";
import { IIBoardCommentsListUIItem } from "../../../../../path/to/types/components/units/types";

const BoardCommentsListUIItem = (pr: IIBoardCommentsListUIItem) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [password, setPassword] = useState("");

  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

  const onClickUpdate = () => {
    setIsEdit((prev) => !prev);
  };

  const onClickDelete = async () => {
    try {
      await deleteBoardComment({
        variables: {
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
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  const onClickOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <S.Wrapper>
      {isOpenDeleteModal && (
        <Modal visible={true} onOk={onClickDelete}>
          <div>비밀번호 입력: </div>
          <S.PasswordInput type="password" onChange={onChangeDeletePassword} />
        </Modal>
      )}
      <S.Box>
        {!isEdit && (
          <S.ItemWrapper>
            <Profilesvg width="40" height="40" fill="#bdbdbd" />

            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{pr.BoardCommentEl?.writer}</S.Writer>
                <S.Star value={pr.BoardCommentEl?.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>
                {pr.BoardCommentEl?.contents.length === 0
                  ? "컨텐츠 없음"
                  : pr.BoardCommentEl?.contents}
              </S.Contents>
              <S.Date>{getDateComma(pr.BoardCommentEl?.createdAt)}</S.Date>
            </S.MainWrapper>

            <S.OptionWrapper>
              <div onClick={onClickUpdate}>
                <Pencilsvg
                  margin="0 16px 0 0"
                  width="19"
                  height="18"
                  fill="#BDBDBD"
                />
              </div>
              <div onClick={onClickOpenDeleteModal}>
                <Closesvg width="14" height="14" fill="#bdbdbd" />
              </div>
            </S.OptionWrapper>
          </S.ItemWrapper>
        )}
      </S.Box>

      {isEdit && (
        <BoardCommentWrite
          isEdit={true}
          setIsEdit={setIsEdit}
          BoardCommentEl={pr.BoardCommentEl}
        />
      )}
      <S.Hr />
    </S.Wrapper>
  );
};

export default BoardCommentsListUIItem;
