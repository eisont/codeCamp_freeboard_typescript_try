import * as S from "../myPoint.styles";
import { v4 as uuidv4 } from "uuid";
import { PointComma } from "../../../../../commons/libraries/point";
import { gql, useQuery } from "@apollo/client";
import { getDateComma } from "../../../../../commons/libraries/utils";
import {
  IPointTransaction,
  IQuery,
  IQueryFetchPointTransactionsOfLoadingArgs,
} from "../../../../../../path/to/types/generated/types";
import Pagination01 from "../../../paginations/01/pagination01.container";

const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
  query fetchPointTransactionsOfLoading($search: String, $page: Int) {
    fetchPointTransactionsOfLoading(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      createdAt
    }
  }
`;
const FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING = gql`
  query fetchPointTransactionsCountOfLoading {
    fetchPointTransactionsCountOfLoading
  }
`;

const PointCharge = () => {
  const ChargeTh = ["충전일", "결제 ID", "충전 내역", "충전 후 잔액"];

  const { data: LoadingData, refetch: LoadingRefetch } = useQuery<
    Pick<IQuery, "fetchPointTransactionsOfLoading">,
    IQueryFetchPointTransactionsOfLoadingArgs
  >(FETCH_POINT_TRANSACTIONS_OF_LOADING);

  const { data: fetchPointTransactionsCountOfLoadingData } = useQuery<
    IQuery,
    "fetchPointTransactionsCountOfLoading"
  >(FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING);
  return (
    <S.SectionMain>
      <S.Row4Head>
        {ChargeTh.map((el: string) => (
          <S.Th key={uuidv4()}>{el}</S.Th>
        ))}
      </S.Row4Head>

      {LoadingData?.fetchPointTransactionsOfLoading?.map(
        (el: IPointTransaction) => (
          <S.Row4Body key={el?._id}>
            <S.Td>{getDateComma(el?.createdAt)}</S.Td>

            <S.Td>{el?.impUid}</S.Td>
            <S.Amount Amount={String(el?.amount)}>
              {`${el?.amount}`.split("")[0] !== "-"
                ? `+${PointComma(el?.amount)}`
                : PointComma(el?.amount)}
            </S.Amount>
            <S.Balance>￦ {PointComma(el?.balance)}</S.Balance>
          </S.Row4Body>
        )
      )}

      <div style={{ margin: "40px 0" }}>
        <Pagination01
          data={
            fetchPointTransactionsCountOfLoadingData?.fetchPointTransactionsCountOfLoading
          }
          refetch={LoadingRefetch}
        />
      </div>
    </S.SectionMain>
  );
};

export default PointCharge;
