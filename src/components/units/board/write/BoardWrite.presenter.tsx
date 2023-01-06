import * as S from "./BoardWrite.styles";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";

const BoardWriteUI = (pr: any) => {
  console.log("boardWriteUI");
  return (
    <S.Wrapper>
      <S.Title>게시판 등록</S.Title>

      <S.WriterWrapper>
        <S.InputWrapper>
          <S.Label>비밀번호</S.Label>
          <S.Password
            type="password"
            placeholder="(필수) 비밀번호를 작성해주세요."
          />
        </S.InputWrapper>
      </S.WriterWrapper>

      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.Subject type="text" placeholder="(필수) 제목을 작성해주세요." />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.Contents placeholder="(필수) 내용을 작성해주세요." />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>주소</S.Label>
        <S.ZonecodeWrapper>
          <S.Zonecode value={"우편번호"} />
          <S.SearchButton onClick={pr.onClickAddressSearch} type="button">
            우편번호 검색
          </S.SearchButton>
          {pr.isOpen && (
            <Modal
              visible={pr.isOpen}
              onOk={pr.onClickAddressSearch}
              onCancel={pr.onClickAddressSearch}
              width={800}
            >
              <DaumPostcode onComplete={pr.onCompleteAddressSearch} />
            </Modal>
          )}
        </S.ZonecodeWrapper>
        <S.Addressbasic value={"(선택) 주소를 선택해주세요."} />
        <S.AddressDetail placeholder="(선택) 상세 주소를 입력해주세요." />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>유튜브</S.Label>
        <S.Youtube placeholder="(선택) 링크를 복사해주세요." />
      </S.InputWrapper>

      <S.ImageWrapper>
        <S.ImageTitle>사진 첨부</S.ImageTitle>
      </S.ImageWrapper>

      <S.ButtonWrapper>
        <S.SubmitButton>등록하기</S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default BoardWriteUI;
