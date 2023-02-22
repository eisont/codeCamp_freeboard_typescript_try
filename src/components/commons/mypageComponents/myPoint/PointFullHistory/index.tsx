import * as S from "../MyPoint.styles";
import { v4 as uuidv4 } from "uuid";
import { PointComma } from "../../../../../commons/libraries/point";
import { gql, useQuery } from "@apollo/client";
import { getDateComma } from "../../../../../commons/libraries/utils";
import { IQuery } from "../../../../../../path/to/types/generated/types";

export const FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($search: String, $page: Int) {
    fetchPointTransactions(search: $search, page: $page) {
      _id
      amount
      balance
      status
      statusDetail
      createdAt
    }
  }
`;

const PointFullHistory = () => {
  const TotalTh = ["날짜", "내용", "거래 및 충전 내역", "잔액"];

  const { data: PointData } = useQuery<IQuery, "fetchPointTransactions">(
    FETCH_POINT_TRANSACTIONS
  );

  return (
    <S.SectionMain>
      <S.Row4Head>
        {TotalTh.map((el) => (
          <S.Th key={uuidv4()}>{el}</S.Th>
        ))}
      </S.Row4Head>
      {PointData?.fetchPointTransactions?.map((el) => (
        <S.Row4Body key={uuidv4()}>
          <S.Td>{getDateComma(el?.createdAt)}</S.Td>

          <S.Status Status={el?.status}>{el?.status}</S.Status>
          <S.Amount Amount={String(el?.amount)}>
            {`${el?.amount}`.split("")[0] !== "-"
              ? `+${PointComma(el?.amount)}`
              : PointComma(el?.amount)}
          </S.Amount>
          <S.Balance>￦ {PointComma(el?.balance)}</S.Balance>
        </S.Row4Body>
      ))}
    </S.SectionMain>
  );
};

export default PointFullHistory;
