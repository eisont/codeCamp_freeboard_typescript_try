// Header Container

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FETCH_USED_ITEMS_COUNT_IPICKED,
  FETCH_USER_LOGGED_IN,
  LOGOUT_USER,
} from "./header.query";
import LayoutHeaderUI from "./header.presenter";

const LayoutHeader = (props: any) => {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [logoutUser] = useMutation(LOGOUT_USER);

  const { data: IPicked } = useQuery(FETCH_USED_ITEMS_COUNT_IPICKED);
  const { data: loggedIn } = useQuery(FETCH_USER_LOGGED_IN);

  // 메인페이지 이동
  const onClickHome = () => {
    router.push("/");
  };
  // 로그인 이동
  const onClickLogin = () => {
    router.push("/login");
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
    props.setIsChargeModal(true);
  };

  return (
    <LayoutHeaderUI
      IPicked={IPicked}
      loggedIn={loggedIn?.fetchUserLoggedIn}
      onClickHome={onClickHome}
      onClickLogin={onClickLogin}
      onClickLogout={onClickLogout}
      onClickSignup={onClickSignup}
      onClickModal={onClickModal}
      isModal={isModal}
      onClickChangeImage={onClickChangeImage}
      isChargeModal={props.isChargeModal}
      onClickCharge={onClickCharge}
    />
  );
};

export default LayoutHeader;
