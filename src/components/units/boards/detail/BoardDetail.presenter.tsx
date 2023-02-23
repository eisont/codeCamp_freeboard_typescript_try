import DOMPurify from "dompurify";
import { Tooltip } from "antd";
import {
  Addresssvg,
  LikeIconsvg,
  LinkIconsvg,
} from "../../../../commons/styles/Iconsvg";
import * as S from "./BoardDetail.style";
import { getDateComma } from "../../../../commons/libraries/utils";
import { IPropsPre } from "./BoardDetail.types";
import BoardDetailCarousel from "../../../commons/carousel/boardDetail";
import UserInfoPicure from "../../../commons/Info/userInfoPicture";

const BoardDetailUI = (pr: IPropsPre) => {
  return (
    <S.Wrapper>
      <S.Contents>
        <S.Header>
          <S.UserInformation>
            <UserInfoPicure
              size="47"
              data={pr.fetchBoardData?.fetchBoard?.user?.picture}
            />

            <div style={{ margin: "0 0 0 16.67px" }}>
              <S.UserName>{pr.fetchBoardData?.fetchBoard?.writer}</S.UserName>
              <S.CreatedAt>
                Date: {getDateComma(pr.fetchBoardData?.fetchBoard?.createdAt)}
              </S.CreatedAt>
            </div>
          </S.UserInformation>

          <S.HeaderButtons>
            <LinkIconsvg
              margin="29.33px"
              width="28"
              height="14"
              fill="#ffd600"
            />
            <Tooltip
              placement="top"
              title={
                pr.fetchBoardData?.fetchBoard?.boardAddress
                  ? `${pr.fetchBoardData?.fetchBoard.boardAddress?.address} ${pr.fetchBoardData?.fetchBoard.boardAddress?.addressDetail}`
                  : "등록한 주소가 없습니다."
              }
            >
              <div>
                <Addresssvg width="32" height="32" fill="#ffd600" />
              </div>
            </Tooltip>
          </S.HeaderButtons>
        </S.Header>

        <S.Body>
          <S.SectionText>{pr.fetchBoardData?.fetchBoard?.title}</S.SectionText>

          {pr.ImageCheck?.length === 0 ? (
            <></>
          ) : pr.ImageCheck?.length === 1 ? (
            <S.ImageBox>
              <S.Image
                src={`https://storage.googleapis.com/${pr.ImageCheck}`}
              />
            </S.ImageBox>
          ) : (
            <BoardDetailCarousel images={pr.ImageCheck} />
          )}

          {typeof window !== "undefined" && (
            <S.SectionContent
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  String(pr.fetchBoardData?.fetchBoard?.contents)
                ),
              }}
            />
          )}

          <S.SectionVideoBox>
            {pr.youtubeCheck && (
              <S.SectionVideoURL
                url={String(pr.fetchBoardData?.fetchBoard.youtubeUrl)}
              />
            )}
          </S.SectionVideoBox>
        </S.Body>

        <S.LikeButtonBox>
          <S.LikeButton onClick={pr.onClickLikeCount}>
            <LikeIconsvg width="22" height="20" fill="#ffd600" />
            <S.LikeNumber>
              {pr.fetchBoardData?.fetchBoard.likeCount}
            </S.LikeNumber>
          </S.LikeButton>
          <S.DisLikeButton onClick={pr.onClickDisLikeCount}>
            <LikeIconsvg
              width="22"
              height="20"
              fill="#ffd600"
              transform="rotate(180deg)"
            />
            <S.DisLikeNumber>
              {pr.fetchBoardData?.fetchBoard.dislikeCount}
            </S.DisLikeNumber>
          </S.DisLikeButton>
        </S.LikeButtonBox>
      </S.Contents>

      <S.MenuButtons>
        <S.Button onClick={pr.onClickMoveToBoardList}>목록으로</S.Button>
        <S.Button onClick={pr.onClickMoveToBoardEdit}>수정하기</S.Button>
        <S.Button onClick={pr.onClickDelete}>삭제하기</S.Button>
      </S.MenuButtons>
      <S.WrapperHr />
    </S.Wrapper>
  );
};

export default BoardDetailUI;
