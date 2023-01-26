// 중고마켓 목록 presenter

import * as S from "./MarketsList.style";
import { PointComma } from "../../../../commons/libraries/point";
import {
  Eurosvg,
  Heartsvg,
  Profilesvg,
} from "../../../../commons/styles/Iconsvg";
import { CodeCampLogosvg } from "../../../../commons/styles/Imgsvg";
import { IPropsPreItem } from "./MarketsList.types";
import { v4 as uuidv4 } from "uuid";

const MarketListUIItem = (pr: IPropsPreItem) => {
  const ImageResult = pr.el?.images?.filter((el) => el)[0];
  const ImageFilter = ImageResult?.includes(`http`);

  const SellerPicture1 = pr.el?.seller?.picture?.includes(`data:image`);

  const SellerPicture2 = pr.el?.seller?.picture?.includes(
    `https://storage.googleapis.com/`
  );

  const SellerPictureResult = SellerPicture1 || SellerPicture2;

  return (
    <S.Row key={pr.el?._id}>
      <S.FlexOutBox>
        <S.FlexBox>
          {!ImageResult ? (
            <S.BestNoImgBox>
              <CodeCampLogosvg width="130" fill="#000" />
            </S.BestNoImgBox>
          ) : (
            <S.Image
              src={
                ImageFilter
                  ? ImageResult
                  : `https://storage.googleapis.com/${ImageResult}`
              }
              id={pr.el?._id}
              onClick={pr.onClickMoveToMarketDetail}
            />
          )}

          <S.ColumnBox>
            <S.Name>
              {pr.el?.name
                ?.replaceAll(String(pr.keyword), `#$%#${pr.keyword}#$%#`)
                .split(`#$%#`)
                .map((ch) => (
                  <S.Word key={uuidv4()} isMatched={pr.keyword === ch}>
                    {ch}
                  </S.Word>
                ))}
            </S.Name>
            <S.Remarks>{pr.el?.remarks} </S.Remarks>
            {pr.el.tags?.length === 0 ? (
              <S.ColumnTags>해시태그 없음</S.ColumnTags>
            ) : (
              <S.ColumnTags> {pr.el?.tags} </S.ColumnTags>
            )}

            <S.FlexBox style={{ margin: "24px 0 0 0" }}>
              {pr.el?.seller?.picture === null ? (
                <Profilesvg
                  margin="0 6px 0 0"
                  width="20"
                  height="20"
                  fill="#bdbdbd"
                />
              ) : (
                <S.SellerIcon
                  src={
                    SellerPictureResult
                      ? pr.el?.seller?.picture
                      : `https://storage.googleapis.com/${pr.el?.seller?.picture}`
                  }
                />
              )}
              {pr.el?.seller?.name?.length === 0 ? (
                <S.Seller> 판매자 이름 없음 </S.Seller>
              ) : (
                <S.Seller> {pr.el?.seller?.name} </S.Seller>
              )}
              <Heartsvg
                margin="0 6px 0 0"
                width="20"
                height="18.35"
                fill="#ffd600"
              />
              <S.Pick> {pr.el?.pickedCount} </S.Pick>
            </S.FlexBox>
          </S.ColumnBox>
        </S.FlexBox>

        <S.FlexPrice>
          <Eurosvg margin="0 11px 0 0" width="18" height="18" fill="#FFD600" />
          {PointComma(Number(pr.el?.price))}원
        </S.FlexPrice>
      </S.FlexOutBox>
    </S.Row>
  );
};

export default MarketListUIItem;
