import * as S from "../MyPoint.styles";
import { v4 as uuidv4 } from "uuid";
import { getDateComma } from "../../../../../commons/libraries/utils";
import { PointComma } from "../../../../../commons/libraries/point";
import { gql, useQuery } from "@apollo/client";
import {
  IPointTransaction,
  IQuery,
  IQueryFetchPointTransactionsOfBuyingArgs,
} from "../../../../../../path/to/types/generated/types";
import { useRouter } from "next/router";
import Pagination01 from "../../../paginations/01/Pagination01.container";

const FETCH_POINT_TRANSACTIONS_OF_BUYING = gql`
  query fetchPointTransactionsOfBuying($search: String, $page: Int) {
    fetchPointTransactionsOfBuying(search: $search, page: $page) {
      _id
      amount
      balance
      useditem {
        name
        buyer {
          _id
        }
      }
      createdAt
    }
  }
`;
const FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING = gql`
  query fetchPointTransactionsCountOfBuying {
    fetchPointTransactionsCountOfBuying
  }
`;

const PointBuy = () => {
  const router = useRouter();

  const BuyTh = ["거래일", "상품명", "거래 내역", "거래 후 잔액", "판매자"];

  const { data: BuyingData, refetch: BuyingRefetch } = useQuery<
    Pick<IQuery, "fetchPointTransactionsOfBuying">,
    IQueryFetchPointTransactionsOfBuyingArgs
  >(FETCH_POINT_TRANSACTIONS_OF_BUYING);

  const { data: fetchPointTransactionsCountOfBuyingData } = useQuery<
    IQuery,
    "fetchPointTransactionsCountOfBuying"
  >(FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING);

  const onClickCheck = (id: string) => async (_: any) => {
    router.push(`./markets/${id}`);
  };

  return (
    <S.SectionMain>
      <S.RowHead>
        {BuyTh.map((el: string) => (
          <S.Th key={uuidv4()}>{el}</S.Th>
        ))}
      </S.RowHead>

      {BuyingData?.fetchPointTransactionsOfBuying?.map(
        (el: IPointTransaction) => (
          <S.RowBody key={el?._id} onClick={onClickCheck(el?._id)}>
            <S.Td>{getDateComma(el?.createdAt)}</S.Td>

            <S.Td>{el?.useditem?.name}</S.Td>
            <S.Amount Amount={String(el?.amount)}>
              {`${el?.amount}`.split("")[0] !== "-"
                ? `+${PointComma(el?.amount)}`
                : PointComma(el?.amount)}
            </S.Amount>
            <S.Balance>￦ {PointComma(el?.balance)}</S.Balance>
            <S.Td>
              {el?.useditem?.buyer?.name ? el?.useditem?.buyer?.name : "판매자"}
            </S.Td>
          </S.RowBody>
        )
      )}

      <div style={{ margin: "40px 0" }}>
        <Pagination01
          data={
            fetchPointTransactionsCountOfBuyingData?.fetchPointTransactionsCountOfBuying
          }
          refetch={BuyingRefetch}
        />
      </div>
    </S.SectionMain>
  );
};

export default PointBuy;
