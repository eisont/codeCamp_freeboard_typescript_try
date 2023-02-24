// Header Presenter

import * as S from "./header.styles";
import { CodeCampLogosvg } from "../../../../commons/styles/Imgsvg";
import {
  Logoutsvg,
  PointPigsvg,
  ProfileArrow,
} from "../../../../commons/styles/Iconsvg";
import { PointComma } from "../../../../commons/libraries/point";
import UserInfoPicure from "../../Info/userInfoPicture";
import { ILayoutHeaderUI } from "../../../../../path/to/types/components/commons/types";

const LayoutHeaderUI = (props: ILayoutHeaderUI) => {
  return (
    <>
      <S.Wrapper>
        <S.CenterBox>
          <div onClick={props.onClickHome} style={{ cursor: "pointer" }}>
            <CodeCampLogosvg width="236" height="36" fill="#000" />
          </div>

          {props.accessToken ? (
            <S.UserInfoBox>
              <S.FlexBox onClick={props.onClickModal}>
                <UserInfoPicure
                  data={props.userloggedInData?.fetchUserLoggedIn?.picture}
                  size="48"
                />
                <ProfileArrow
                  width="12"
                  height="9"
                  fill="#000"
                  margin="0 0 0 28px"
                />
              </S.FlexBox>

              {props.isModal && (
                <>
                  <S.ModalabsoluteBox>
                    <ProfileArrow
                      transform="rotate(180deg)"
                      width="16"
                      height="12"
                      fill="#fff"
                    />
                  </S.ModalabsoluteBox>

                  <S.ModalBox>
                    <S.UserInfo onClick={props.onClickMypage}>
                      <UserInfoPicure
                        data={
                          props.userloggedInData?.fetchUserLoggedIn?.picture
                        }
                        size="48"
                      />
                      <S.User>
                        <S.UserName>
                          {props.userloggedInData?.fetchUserLoggedIn?.name}
                        </S.UserName>
                        <S.UserPoint>
                          {PointComma(
                            Number(
                              props.userloggedInData?.fetchUserLoggedIn
                                ?.userPoint?.amount
                            )
                          )}
                          P
                        </S.UserPoint>
                      </S.User>
                    </S.UserInfo>
                    <S.Hr Bg="#000" />
                    <S.MenuBox onClick={props.onClickCharge}>
                      <PointPigsvg
                        margin="0 14px 0 0"
                        width="20"
                        height="19"
                        fill="#bdbdbd"
                      />
                      충전하기
                    </S.MenuBox>

                    <S.Hr Bg="#efefef" />

                    <S.MenuBox onClick={props.onClickLogout}>
                      <Logoutsvg
                        margin="0 15px 0 0"
                        width="18"
                        height="18"
                        fill="#bdbdbd"
                      />
                      로그아웃
                    </S.MenuBox>
                  </S.ModalBox>
                </>
              )}
            </S.UserInfoBox>
          ) : (
            <S.FlexBox2>
              <S.LoginBt onClick={props.onClickLogin}>로그인</S.LoginBt>
              <S.SignupBt onClick={props.onClickSignup}>회원가입</S.SignupBt>
            </S.FlexBox2>
          )}
        </S.CenterBox>
      </S.Wrapper>
    </>
  );
};

export default LayoutHeaderUI;
