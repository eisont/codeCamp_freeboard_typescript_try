import * as S from "./BoardWrite.styles";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { v4 as uuidv4 } from "uuid";
import { IBoardWriteUI } from "../../../../../path/to/types/components/units/types";
import Uploads01 from "../../../commons/uploads/01/upload01.container";

const BoardWriteUI = (pr: IBoardWriteUI) => {
  return (
    <S.Wrapper onSubmit={pr.handleSubmit(pr.onClickSubmit)}>
      <S.Title>{pr.isEdit ? "게시판 수정" : "게시판 등록"}</S.Title>

      <S.PasswordWrapper>
        <S.InputWrapper>
          <S.Label>작성자</S.Label>
          <S.PasswordInput
            type="text"
            placeholder="(필수) 작성자를 작성해주세요."
            {...pr.register("writer")}
          />
          <S.Error>
            {pr.formState?.errors?.writer?.message &&
              String(pr.formState?.errors?.writer?.message)}
          </S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>비밀번호</S.Label>
          <S.PasswordInput
            type="password"
            placeholder="(필수) 비밀번호를 작성해주세요."
            {...pr.register("password")}
          />
          <S.Error>
            {pr.formState?.errors?.password?.message &&
              String(pr.formState?.errors?.password?.message)}
          </S.Error>
        </S.InputWrapper>
      </S.PasswordWrapper>

      <S.InputWrapper>
        <S.Label>제목</S.Label>
        <S.SubjectInput
          type="text"
          placeholder="(필수) 제목을 작성해주세요."
          defaultValue={pr.fetchBoardData?.fetchBoard?.title}
          {...pr.register("title")}
        />
        <S.Error>
          {pr.formState?.errors?.title?.message &&
            String(pr.formState?.errors?.title?.message)}
        </S.Error>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.ContentsTextArea
          placeholder="(필수) 내용을 작성해주세요."
          defaultValue={pr.fetchBoardData?.fetchBoard?.contents}
          {...pr.register("contents")}
        />
        <S.Error>
          {pr.formState?.errors?.contents?.message &&
            String(pr.formState?.errors?.contents?.message)}
        </S.Error>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>주소</S.Label>
        <S.ZonecodeWrapper>
          <S.ZonecodeInput
            readOnly
            // value랑 defaultValue를 같이 작성합니다.
            value={
              pr.zonecode ||
              pr.fetchBoardData?.fetchBoard.boardAddress?.zipcode ||
              "우편번호"
            }
          />
          <S.SearchButton onClick={pr.onClickAddressSearch} type="button">
            우편번호 검색
          </S.SearchButton>
          {pr.isOpen && (
            <Modal
              open={Boolean(pr.isOpen)}
              onOk={pr.onClickAddressSearch}
              onCancel={pr.onClickAddressSearch}
              width={1000}
            >
              <DaumPostcode onComplete={pr.onCompleteAddressSearch} />
            </Modal>
          )}
        </S.ZonecodeWrapper>
        <S.AddressInput
          readOnly
          value={
            pr.address ||
            pr.fetchBoardData?.fetchBoard.boardAddress?.address ||
            "(선택) 주소를 선택해주세요."
          }
        />
        <S.AddressDetailInput
          placeholder="(선택) 상세 주소를 입력해주세요."
          defaultValue={
            pr.fetchBoardData?.fetchBoard.boardAddress?.addressDetail || ""
          }
          {...pr.register("addressDetail")}
        />
        <S.Error>
          {pr.formState?.errors?.addressDetail?.message &&
            String(pr.formState?.errors?.addressDetail?.message)}
        </S.Error>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>유튜브</S.Label>
        <S.YoutubeInput
          placeholder="(선택) 링크를 복사해주세요."
          defaultValue={
            pr.fetchBoardData?.fetchBoard?.youtubeUrl
              ? String(pr.fetchBoardData?.fetchBoard?.youtubeUrl)
              : ""
          }
          {...pr.register("youtubeUrl")}
        />
        <S.Error>
          {pr.formState?.errors?.youtubeUrl?.message &&
            String(pr.formState?.errors?.youtubeUrl?.message)}
        </S.Error>
      </S.InputWrapper>

      <S.ImageWrapper>
        <S.ImageTitle>사진 첨부</S.ImageTitle>
        {pr.fileUrls.map((el, index) => (
          <Uploads01
            key={uuidv4()}
            index={index}
            fileUrl={el}
            onChangeFileUrls={pr.onChangeFileUrls}
          />
        ))}
      </S.ImageWrapper>

      <S.ButtonWrapper>
        <S.SubmitButton isActive={pr.isEdit ? true : pr.isActive}>
          {pr.isEdit ? "수정하기" : "등록하기"}
        </S.SubmitButton>
        <S.SubmitButton onClick={pr.onClickBack}>뒤로가기</S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default BoardWriteUI;
