import * as S from "./myMarketItems.styles";
import DOMPurify from "dompurify";
import { PointComma } from "../../../../commons/libraries/point";
import { getDateComma } from "../../../../commons/libraries/utils";
import Pagination01 from "../../paginations/01/pagination01.container";
import { IMyMarketsItemsUI } from "../../../../../path/to/types/components/commons/types";

const MyMarketsItemsUI = (pr: IMyMarketsItemsUI) => {
  return (
    <S.Section>
      <S.SectionHead>
        <S.MenuBox>
          <S.MyItems onClick={pr.onClickMyItems} myItems={pr.myItems}>
            나의 상품
          </S.MyItems>
          <S.Hrs />
          <S.MyPicked onClick={pr.onClickMyPicked} myPicked={pr.myPicked}>
            마이 찜
          </S.MyPicked>
        </S.MenuBox>
      </S.SectionHead>

      <S.SectionMain>
        {pr.myItems && !pr.myPicked && (
          // 나의 상품
          <>
            <S.RowHead>
              <S.Th>번호</S.Th>
              <S.Th>상품명</S.Th>
              <S.Th></S.Th>
              <S.Th>판매가격</S.Th>
              <S.Th>날짜</S.Th>
            </S.RowHead>

            {pr.IsoldData?.fetchUseditemsISold?.map((el, index: number) => (
              <S.RowBody onClick={pr.onClickID(el?._id)} key={el?._id}>
                <S.Td>{index + 1}</S.Td>

                {el?.name === "" ? (
                  <S.Td>상품명이 없습니다.</S.Td>
                ) : (
                  <>
                    {typeof window !== "undefined" && (
                      <S.Td
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(String(el?.name)),
                        }}
                      />
                    )}
                  </>
                )}

                {el?.buyer !== null ? (
                  <S.Td style={{ color: "#FFD600", fontWeight: "700" }}>
                    판매 완료
                  </S.Td>
                ) : (
                  <S.Td />
                )}
                <S.Td>￦ {PointComma(Number(el?.price))}</S.Td>
                <S.Td>{getDateComma(el?.createdAt)}</S.Td>
              </S.RowBody>
            ))}
          </>
        )}

        {!pr.myItems && pr.myPicked && (
          // 마이 찜
          <>
            <S.Row6Th>
              <S.Th>번호</S.Th>
              <S.Th>상품명</S.Th>
              <S.Th></S.Th>
              <S.Th>판매가격</S.Th>
              <S.Th>판매자</S.Th>
              <S.Th>날짜</S.Th>
            </S.Row6Th>
            {pr.pickData?.fetchUseditemsIPicked?.map((el, index) => (
              <S.Row6 onClick={pr.onClickID(el?._id)} key={el?._id}>
                <S.Td>{index + 1}</S.Td>

                {el?.name === "" ? (
                  <S.Td>상품명이 없습니다.</S.Td>
                ) : (
                  <>
                    {typeof window !== "undefined" && (
                      <S.Td
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(String(el?.name)),
                        }}
                      />
                    )}
                  </>
                )}
                {el?.buyer !== null ? (
                  <S.Td style={{ color: "#FFD600", fontWeight: "700" }}>
                    판매 완료
                  </S.Td>
                ) : (
                  <S.Td />
                )}
                <S.Td>￦ {PointComma(Number(el?.price))}</S.Td>
                <S.Td>{el?.seller?.name}</S.Td>
                <S.Td>{getDateComma(el?.createdAt)}</S.Td>
              </S.Row6>
            ))}
          </>
        )}
      </S.SectionMain>

      {pr.myItems && !pr.myPicked && (
        // 나의 상품
        <div style={{ margin: "40px 0" }}>
          <Pagination01
            data={pr.soldCountData?.fetchUseditemsCountISold}
            refetch={pr.ISoldRefetch}
          />
        </div>
      )}
      {!pr.myItems && pr.myPicked && (
        // 마이 찜
        <div style={{ margin: "40px 0" }}>
          <Pagination01
            data={pr.pickCountData?.fetchUseditemsCountIPicked}
            refetch={pr.IPickedRefetch}
          />
        </div>
      )}
    </S.Section>
  );
};

export default MyMarketsItemsUI;
