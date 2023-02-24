// 중고마켓 등록 presenter

import * as S from "./MarketWrite.styles";
import { SmileOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";
import KakaoMapPage from "../../../commons/kakaomap/01";
import { useRecoilState } from "recoil";
import {
  contentsErrorState,
  LatState,
  LngState,
  nameErrorState,
  priceErrorState,
  remarksErrorState,
} from "../../../../commons/store";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Uploads01 from "../../../commons/uploads/01/upload01.container";
import { IMarketWriteUI } from "../../../../../path/to/types/components/units/types";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const MarketWriteUI = (pr: IMarketWriteUI) => {
  const [lat] = useRecoilState(LatState);
  const [lng] = useRecoilState(LngState);
  const [nameError] = useRecoilState(nameErrorState);
  const [remarksError] = useRecoilState(remarksErrorState);
  const [priceError] = useRecoilState(priceErrorState);
  const [contentsError] = useRecoilState(contentsErrorState);
  return (
    <S.Wrapper>
      <S.Title>{pr.isEdit ? "상품 수정하기" : "상품 등록하기"}</S.Title>

      {/* 상품명 */}
      <S.InputWrapper>
        <S.Label>상품명</S.Label>
        <S.Subject
          type="text"
          placeholder="(필수) 상품명을 작성해주세요."
          onChange={pr.onChangeName}
        />
        <S.Error>{nameError}</S.Error>
      </S.InputWrapper>
      {/* 한줄요약 */}
      <S.InputWrapper>
        <S.Label>한줄요약</S.Label>
        <S.Subject
          type="text"
          placeholder="(필수) 한줄요약을 작성해주세요."
          onChange={pr.onChangeRemarks}
        />
        <S.Error>{remarksError}</S.Error>
      </S.InputWrapper>
      {/* 상품설명 */}
      <S.InputWrapper>
        <S.Label>상품설명</S.Label>
        <ReactQuill
          onChange={pr.onChangeContents}
          style={{ width: "996px", height: "300px", background: "#fff" }}
          placeholder="(필수) 상품설명을 작성해주세요."
        />
        <S.Error>{contentsError}</S.Error>
      </S.InputWrapper>
      {/* 판매가격 */}
      <S.InputWrapper>
        <S.Label>판매가격</S.Label>
        <S.Subject
          type="number"
          placeholder="(필수) 판매가격을 작성해주세요."
          onChange={pr.onChangePrice}
        />
        <S.Error>{priceError}</S.Error>
      </S.InputWrapper>
      {/* 태그입력 */}
      <S.TagWrapper>
        <S.Label>태그입력</S.Label>
        <S.TagRBox>
          <S.Subject
            type="text"
            placeholder="(필수) 태그를 선택해주세요"
            onKeyUp={pr.onChangeTags}
          />
          <S.Span>
            {pr.hashArr.map((el, idx) => (
              <S.Text key={idx}>{el}</S.Text>
            ))}
          </S.Span>
        </S.TagRBox>
      </S.TagWrapper>
      {/* 거래위치 */}
      <S.InputWrapper>
        <S.Label>거래위치</S.Label>
        <KakaoMapPage />
        <S.ZonecodeWrapper>
          <S.Longitude readOnly value={lat} />
          <S.Latitude readOnly value={lng} />
          <S.SearchButton onClick={pr.onClickAddressSearch} type="button">
            우편번호 검색
          </S.SearchButton>
          {pr.isOpen && (
            <Modal
              visible={pr.isOpen}
              onOk={pr.onClickAddressSearch}
              onCancel={pr.onClickAddressSearch}
              width={800}
              closeIcon={<SmileOutlined />}
            >
              <DaumPostcode onComplete={pr.onCompleteAddressSearch} />
            </Modal>
          )}
        </S.ZonecodeWrapper>
        <S.Addressbasic
          readOnly
          value={
            pr.address ||
            pr.fetchUseditemData?.fetchUseditem.useditemAddress?.address ||
            "(선택) 주소를 선택해주세요."
          }
        />
        <S.AddressDetail
          placeholder="(선택) 상세 주소를 입력해주세요."
          onChange={pr.onChangeAddressDetail}
          defaultValue={
            pr.addressDetail ||
            pr.fetchUseditemData?.fetchUseditem.useditemAddress
              ?.addressDetail ||
            ""
          }
        />
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
        {/* <GraphqlMutationPageUI fileRef /> */}
      </S.ImageWrapper>

      <S.OptionWrapper>
        <S.Label>메인설정</S.Label>
        <S.RadioButton type="radio" id="youtube" name="radio-button" />
        <S.RadioLabel htmlFor="youtube">유튜브</S.RadioLabel>
        <S.RadioButton type="radio" id="image" name="radio-button" />
        <S.RadioLabel htmlFor="image">사진</S.RadioLabel>
      </S.OptionWrapper>

      <S.ButtonWrapper>
        <S.SubmitButton
          onClick={pr.isEdit ? pr.onClickUpdate : pr.onClickSubmit}
          isActive={pr.isEdit ? true : pr.isActive}
        >
          {pr.isEdit ? "수정하기" : "등록하기"}
        </S.SubmitButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default MarketWriteUI;
