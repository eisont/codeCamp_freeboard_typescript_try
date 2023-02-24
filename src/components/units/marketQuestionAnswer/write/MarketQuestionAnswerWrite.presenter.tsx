// 중고마켓 댓글 등록 presenter

import { IMarketQuestionAnswerWriteUI } from "../../../../../path/to/types/components/units/types";
import * as S from "./MarketQuestionAnswerWrite.styles";

const MarketQuestionAnswerWriteUI = (pr: IMarketQuestionAnswerWriteUI) => {
  return (
    <S.Wrapper>
      {/* isEdit이 false일때 댓글 입력창 보여줘 */}
      <S.ContentsWrapper>
        <S.Contents
          maxLength={100}
          onChange={pr.onChangeContents}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <S.BottomWrapper>
          {/* 글자 갯수를 보여주는 역할 */}
          <S.ContentsLength>{pr.contents.length}/100</S.ContentsLength>
          <div style={{ display: "flex" }}>
            <S.Button onClick={pr.onClickCancel}> 취소 </S.Button>
            <S.Button
              onClick={pr.isAnswerEdit ? pr.onClickAnswer : pr.onClickUpdate}
            >
              {pr.isAnswerEdit ? "등록하기" : "수정하기"}
            </S.Button>
          </div>
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
};

export default MarketQuestionAnswerWriteUI;
