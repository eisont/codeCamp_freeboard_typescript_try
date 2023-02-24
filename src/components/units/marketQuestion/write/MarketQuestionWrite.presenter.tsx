// 중고마켓 댓글 등록 presenter

import { IMarketQuestionWriteUI } from "../../../../../path/to/types/components/units/types";
import { CommentIconsvg } from "../../../../commons/styles/Iconsvg";
import * as S from "./MarketQuestionWrite.styles";

const MarketQuestionWriteUI = (pr: IMarketQuestionWriteUI) => {
  return (
    <S.Wrapper>
      {!pr.isQuestionEdit && (
        // 댓글 입력창 보여줘
        <S.Title>
          <CommentIconsvg
            margin="0 14px 0 0"
            width="20"
            height="20"
            fill="#ffd600"
          />
          문의하기
        </S.Title>
      )}
      <S.ContentsWrapper>
        <S.Contents
          maxLength={100}
          onChange={pr.onChangeContents}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <S.BottomWrapper>
          <S.ContentsLength>{pr.contents.length}/100</S.ContentsLength>
          <div style={{ display: "flex" }}>
            {pr.isQuestionEdit && (
              <S.Button onClick={pr.onClickCancel}>취소</S.Button>
            )}
            <S.Button
              onClick={pr.isQuestionEdit ? pr.onClickUpdate : pr.onClickComment}
            >
              {pr.isQuestionEdit ? "수정하기" : "문의하기"}
            </S.Button>
          </div>
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
};

export default MarketQuestionWriteUI;
