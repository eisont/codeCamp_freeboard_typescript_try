// Header Container

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { FETCH_USER_LOGGED_IN, LOGOUT_USER } from "./header.queries";
import LayoutHeaderUI from "./header.presenter";
import {
  IQuery,
  IMutation,
} from "../../../../../path/to/types/generated/types";
import { useRecoilState } from "recoil";
import { AccessTokenState } from "../../../../commons/store";

const LayoutHeader = () => {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);

  const [logoutUser] = useMutation<IMutation, "logoutUser">(LOGOUT_USER);

  const [accessToken] = useRecoilState(AccessTokenState);

  const { data: userloggedInData } = useQuery<IQuery, "fetchUserLoggedIn">(
    FETCH_USER_LOGGED_IN
  );

  // 메인페이지 이동
  const onClickHome = () => {
    router.push("/");
  };
  // 로그인 이동
  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickMypage = () => {
    router.push("/mypage");
  };
  // 로그아웃 기능
  const onClickLogout = async () => {
    try {
      await logoutUser();
      location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };
  // 회원가입 이동
  const onClickSignup = () => {
    router.push("/signup");
  };

  const onClickModal = () => {
    setIsModal((prev) => !prev);
  };
  const onClickChangeImage = () => {
    alert("이미지 변경 버튼");
  };

  // 포인트 충전 모달 창 띄우기
  const onClickCharge = () => {
    setIsModal(false);
  };

  return (
    <LayoutHeaderUI
      accessToken={accessToken}
      userloggedInData={userloggedInData}
      onClickHome={onClickHome}
      onClickLogin={onClickLogin}
      onClickMypage={onClickMypage}
      onClickLogout={onClickLogout}
      onClickSignup={onClickSignup}
      onClickModal={onClickModal}
      isModal={isModal}
      onClickChangeImage={onClickChangeImage}
      onClickCharge={onClickCharge}
    />
  );
};

export default LayoutHeader;
