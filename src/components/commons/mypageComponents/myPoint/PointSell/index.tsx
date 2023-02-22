import * as S from "../MyPoint.styles";
import { v4 as uuidv4 } from "uuid";
import { PointComma } from "../../../../../commons/libraries/point";
import { gql, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { getDateComma } from "../../../../../commons/libraries/utils";
import {
  IPointTransaction,
  IQuery,
  IQueryFetchPointTransactionsOfSellingArgs,
} from "../../../../../../path/to/types/generated/types";
import Pagination01 from "../../../paginations/01/Pagination01.container";
import { useRouter } from "next/router";

const FETCH_POINT_TRANSACTIONS_OF_SELLING = gql`
  query fetchPointTransactionsOfSelling($search: String, $page: Int) {
    fetchPointTransactionsOfSelling(search: $search, page: $page) {
      amount
      balance
      useditem {
        _id
        name
      }
      createdAt
    }
  }
`;

const FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING = gql`
  query fetchPointTransactionsCountOfSelling {
    fetchPointTransactionsCountOfSelling
  }
`;

const PointSell = () => {
  const router = useRouter();
  const SellTh = ["거래일", "상품명", "거래 내역", "거래 후 잔액"];

  const { data: SellingData, refetch: SellingRefetch } = useQuery<
    Pick<IQuery, "fetchPointTransactionsOfSelling">,
    IQueryFetchPointTransactionsOfSellingArgs
  >(FETCH_POINT_TRANSACTIONS_OF_SELLING);

  const { data: fetchPointTransactionsCountOfSellingData } = useQuery(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING
  );

  const onClickMarketsDetail = (id: string) => (_: any) => {
    router.push(`./markets/${id}`);
  };

  return (
    <S.SectionMain>
      <S.Row4Head>
        {SellTh.map((el: string) => (
          <S.Th key={uuidv4()}>{el}</S.Th>
        ))}
      </S.Row4Head>

      {SellingData?.fetchPointTransactionsOfSelling?.map(
        (el: IPointTransaction) => (
          <S.Row4BodyCuser
            key={el?.useditem?._id}
            onClick={onClickMarketsDetail(String(el?.useditem?._id))}
          >
            <S.Td>{getDateComma(el?.createdAt)}</S.Td>

            {el?.useditem?.name === "" ? (
              <S.Td>상품명이 없습니다.</S.Td>
            ) : (
              <>
                {typeof window !== "undefined" && (
                  <S.Td
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(String(el?.useditem?.name)),
                    }}
                  />
                )}
              </>
            )}
            <S.Amount Amount={String(el?.amount)}>
              {`${el?.amount}`.split("")[0] !== "-"
                ? `+${PointComma(el?.amount)}`
                : PointComma(el?.amount)}
            </S.Amount>
            <S.Balance>￦ {PointComma(el?.balance)}</S.Balance>
          </S.Row4BodyCuser>
        )
      )}

      <div style={{ margin: "40px 0" }}>
        <Pagination01
          data={
            fetchPointTransactionsCountOfSellingData?.fetchPointTransactionsCountOfSelling
          }
          refetch={SellingRefetch}
        />
      </div>
    </S.SectionMain>
  );
};

export default PointSell;
