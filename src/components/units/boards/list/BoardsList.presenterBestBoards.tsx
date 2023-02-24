// 게시판 목록 presenter
import { IPropsBestBoards } from "../../../../../path/to/types/components/units/types";
import { getDateComma } from "../../../../commons/libraries/utils";
import { LikeIconsvg } from "../../../../commons/styles/Iconsvg";
import { CodeCampLogosvg } from "../../../../commons/styles/Imgsvg";
import UserInfoPicure from "../../../commons/Info/userInfoPicture";
import * as S from "./BoardsList.styles";

const BoardListsBestBoards = (pr: IPropsBestBoards) => {
  const ImageResult = pr.el?.images?.filter((img) => img)[0];

  return (
    <S.BestBoardsBox
      id={pr.el._id}
      onClick={pr.onClickMoveToBoardDetail(pr.el._id)}
    >
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
          <UserInfoPicure size="20" data={String(pr.el?.user)} />
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

export default BoardListsBestBoards;
