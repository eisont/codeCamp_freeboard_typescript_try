// 게시판 목록 presenter
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { getDateComma } from "../../../../commons/libraries/utiles";
import { LikeIconsvg, Profilesvg } from "../../../../commons/styles/Iconsvg";
import { CodeCampLogosvg } from "../../../../commons/styles/Imgsvg";
import * as S from "./BoardList.style";
import { IPropsBestBoards } from "./BoardList.types";

const BoardListBestBoards = (pr: IPropsBestBoards) => {
  const router = useRouter();

  const onClickMoveToBoardDetail = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element)
      router.push(`/boards/${event.currentTarget.id}`);
  };

  const ImageResult = pr.el?.images?.filter((img) => img)[0];

  return (
    <S.BestBoardsBox id={pr.el._id} onClick={onClickMoveToBoardDetail}>
      <S.BestImgBox>
        {!ImageResult ? (
          <CodeCampLogosvg width="238" height="36" fill="#000" />
        ) : (
          <S.BestBoardImg
            src={`https://storage.googleapis.com/${ImageResult}`}
          />
        )}
      </S.BestImgBox>

      <S.ContentsBox>
        <S.BestBoardsTitle>{pr.el?.title}</S.BestBoardsTitle>
        <S.UserBox>
          <Profilesvg
            margin="0 6px 0 0"
            width="20"
            height="20"
            fill="#dbdbdb"
          />
          <S.BestBoardsName>{pr.el.writer}</S.BestBoardsName>
        </S.UserBox>
        <S.BestBoardsDate>
          Date: {getDateComma(pr.el?.createdAt)}
        </S.BestBoardsDate>
      </S.ContentsBox>

      <S.BestBoardsLikeBox>
        <LikeIconsvg width="20" height="18" fill="#ffd600" />

        <S.BestBoardsLikeCount>{pr.el.likeCount}</S.BestBoardsLikeCount>
      </S.BestBoardsLikeBox>
    </S.BestBoardsBox>
  );
};

export default BoardListBestBoards;
