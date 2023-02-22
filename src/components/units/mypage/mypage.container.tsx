import {
  // useMutation,
  useQuery,
} from "@apollo/client";
import { useState } from "react";
import {
  // IMutation,
  IQuery,
} from "../../../../path/to/types/generated/types";
import MypageUIpage from "./mypage.presenter";
import {
  // CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  FETCH_USER_LOGGED_IN,
} from "./mypage.query";

const MypagePage = () => {
  // 내 장터
  const [myMarketsItems, setMyMarketsItems] = useState(true);
  // 내 포인트
  const [myPoint, setMyPoint] = useState(false);
  // 내 프로필
  const [myProfile, setMyProfile] = useState(false);

  const { data: loggedInUser } = useQuery<IQuery, "fetchUserLoggedIn">(
    FETCH_USER_LOGGED_IN
  );

  // const [createPointTransactionOfBuyingAndSelling] = useMutation<IMutation, 'createPointTransactionOfBuyingAndSelling'>(
  //   CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  // );

  // 이건 뭐냐?
  // const onClickResult = async () => {
  //   try {
  //     await createPointTransactionOfBuyingAndSelling({
  //       variables: { useritemId: "" },
  //     });
  //   } catch (errors: any) {
  //     console.log(errors.message);
  //   }
  // };

  // 내 장터
  const onClickMyMarketItems = () => {
    setMyMarketsItems(true);
    setMyPoint(false);
    setMyProfile(false);
  };
  // 내 포인트
  const onClickMyPoint = () => {
    setMyMarketsItems(false);
    setMyPoint(true);
    setMyProfile(false);
  };
  // 내 프로필
  const onClickMyProfile = () => {
    setMyMarketsItems(false);
    setMyPoint(false);
    setMyProfile(true);
  };

  return (
    <MypageUIpage
      myMarketsItems={myMarketsItems}
      myPoint={myPoint}
      myProfile={myProfile}
      loggedInUser={loggedInUser?.fetchUserLoggedIn}
      // onClickResult={onClickResult}
      onClickMyMarketItems={onClickMyMarketItems}
      onClickMyPoint={onClickMyPoint}
      onClickMyProfile={onClickMyProfile}
    />
  );
};

export default MypagePage;
