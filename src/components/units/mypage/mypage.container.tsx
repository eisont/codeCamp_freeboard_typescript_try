import {
  // useMutation,
  useQuery,
} from "@apollo/client";
import { useState } from "react";
import {
  // IMutation,
  IQuery,
} from "../../../../path/to/types/generated/types";
import MypageUI from "./mypage.presenter";
import {
  // CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  FETCH_USER_LOGGED_IN,
} from "./mypage.queries";

const Mypage = () => {
  // 내 장터
  const [myMarketsItems, setMyMarketsItems] = useState(true);
  // 내 포인트
  const [myPoint, setMyPoint] = useState(false);
  // 내 프로필
  const [myProfile, setMyProfile] = useState(false);

  const { data: loggedInUserData } = useQuery<IQuery, "fetchUserLoggedIn">(
    FETCH_USER_LOGGED_IN
  );

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
    <MypageUI
      myMarketsItems={myMarketsItems}
      myPoint={myPoint}
      myProfile={myProfile}
      loggedInUserData={loggedInUserData}
      onClickMyMarketItems={onClickMyMarketItems}
      onClickMyPoint={onClickMyPoint}
      onClickMyProfile={onClickMyProfile}
    />
  );
};

export default Mypage;
