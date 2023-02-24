// 수정페이지

import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../path/to/types/generated/types";
import withAuth from "../../../../src/components/commons/hocs/withAuth";
import MarketWrite from "../../../../src/components/units/markets/write/MarketWrite.container";

const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      useditemAddress {
        _id
        address
        addressDetail
        lat
        lng
        createdAt
      }
      createdAt
      createdAt
    }
  }
`;

const MarketEditPage = () => {
  // 기능
  const router = useRouter();
  // 수정하기에서 사용하는 조회기능
  const { data: fetchUseditemData } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.useditemId) },
  });

  return <MarketWrite isEdit={true} fetchUseditemData={fetchUseditemData} />;
};

export default withAuth(MarketEditPage);
