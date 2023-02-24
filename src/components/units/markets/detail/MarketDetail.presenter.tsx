// 중고마켓 상세보기 presenter

import * as S from "./MarketDetail.styles";
import { Tooltip } from "antd";
import Script from "next/script";
import KakaoMapShowPage from "../../../commons/kakaomap/show";
import Dompurify from "dompurify";
import { PointComma } from "../../../../commons/libraries/point";
import {
  Addresssvg,
  Heartsvg,
  LinkIconsvg,
} from "../../../../commons/styles/Iconsvg";
import MarketDetailCarousel from "../../../commons/carousel/marketDetail";
import SellerInfo from "../../../commons/Info/sellerInfo";
import { IMarketDetailUI } from "../../../../../path/to/types/components/units/types";

const MarketDetailUI = (pr: IMarketDetailUI) => {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      ></Script>
      <Script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
      ></Script>

      <S.Wrapper>
        <S.Header>
          <SellerInfo data={pr.fetchUsedItemData} />

          <S.SideInfo>
            {pr.SoldAt ? (
              <S.Td>판매 완료</S.Td>
            ) : (
              <S.Td style={{ color: "#FFF", fontWeight: "900" }}>판매 중</S.Td>
            )}
            <LinkIconsvg
              margin="0 15px 0 0"
              width="28"
              height="14"
              fill="#ffd600"
            />
            <Tooltip
              placement="top"
              title={`${pr.fetchUsedItemData?.fetchUseditem.useditemAddress?.address} ${pr.fetchUsedItemData?.fetchUseditem.useditemAddress?.addressDetail}`}
            >
              {/* div로 감싸지 않으면 Tooltip이 적용이 되지 않습니다. */}
              <div>
                <Addresssvg width="32" height="32" fill="#ffd600" />
              </div>
            </Tooltip>
          </S.SideInfo>
        </S.Header>

        <S.Hr />

        <S.FlexBox>
          <S.ColumnBox>
            <S.ItemRemarks>
              {pr.fetchUsedItemData?.fetchUseditem?.remarks}
            </S.ItemRemarks>
            <S.ItemName>{pr.fetchUsedItemData?.fetchUseditem?.name}</S.ItemName>
          </S.ColumnBox>
          <S.HeartBox onClick={pr.onClickPickedCount}>
            {pr.toggleCheck ? (
              <Heartsvg margin="0 0 4px 0" width="30" fill="#ffd600" />
            ) : (
              <S.OutLineHeart />
            )}
            <S.LikeCount>
              {pr.fetchUsedItemData?.fetchUseditem?.pickedCount}
            </S.LikeCount>
          </S.HeartBox>
        </S.FlexBox>

        <S.ItemPrice>
          {PointComma(Number(pr.fetchUsedItemData?.fetchUseditem?.price))}원
        </S.ItemPrice>

        <S.CarouselBox>
          {!pr.ImageCheck?.length ? (
            <></>
          ) : pr.ImageCheck?.length === 1 ? (
            <S.ImageBox>
              <S.Image
                src={`https://storage.googleapis.com/${pr.ImageCheck}`}
              />
            </S.ImageBox>
          ) : (
            <MarketDetailCarousel data={pr.ImageCheck} />
          )}
        </S.CarouselBox>

        {typeof window !== "undefined" && (
          <S.SectionContent
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(
                String(pr.fetchUsedItemData?.fetchUseditem?.contents)
              ),
            }}
          />
        )}

        <S.SectionTags>
          {pr.fetchUsedItemData?.fetchUseditem?.tags?.map(
            (el: string, idx: number) => (
              <S.Tags key={idx}>{el}</S.Tags>
            )
          )}
        </S.SectionTags>

        <S.Hr />

        {pr.LocationCheck && (
          <>
            <S.MapBox>
              <KakaoMapShowPage data={pr.fetchUsedItemData} />
            </S.MapBox>
            <S.Hr />
          </>
        )}

        <S.MenuButtons>
          <S.GrayBt onClick={pr.onClickMoveToMarketList}>목록으로</S.GrayBt>
          {pr.WriterCheck && (
            <>
              <S.YellowBt onClick={pr.onClickMoveToMarketEdit}>
                수정하기
              </S.YellowBt>
              <S.YellowBt onClick={pr.onClickDelete}>삭제하기</S.YellowBt>
            </>
          )}
          {!pr.SoldAt && <S.YellowBt onClick={pr.onClickBuy}>구매</S.YellowBt>}
        </S.MenuButtons>
      </S.Wrapper>
    </>
  );
};

export default MarketDetailUI;
