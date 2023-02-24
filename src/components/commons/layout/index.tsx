import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ILayout } from "../../../../path/to/types/components/commons/types";
import { RecoilModal } from "../../../commons/store";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header/header.container";
import LoginModal from "./loginmodal";
import LayoutNavigation from "./navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Layout = (props: ILayout) => {
  const router = useRouter();

  const [modalClose] = useRecoilState(RecoilModal);

  const MainPage = ["/"];
  const isMainPage = MainPage.includes(router.asPath);

  const LoginPage = ["/login"];
  const SignupPage = ["/signup"];
  const BoardListPage = ["/boards"];
  const MarketsListPage = ["/markets"];
  const isLoginPage = LoginPage.includes(router.asPath);
  const isSignupPage = SignupPage.includes(router.asPath);
  const isBoardListPage = BoardListPage.includes(router.asPath);
  const isMarketsListPage = MarketsListPage.includes(router.asPath);

  return (
    <Wrapper>
      {!isMainPage && !isLoginPage && !isSignupPage && <LayoutHeader />}
      {!isMainPage && !isLoginPage && !isSignupPage && <LayoutNavigation />}
      {(isBoardListPage || isMarketsListPage) && <LayoutBanner />}

      {modalClose && <LoginModal Title="로그인이 필요합니다." />}

      <div>{props.children}</div>
      {!isMainPage && !isLoginPage && !isSignupPage && <LayoutFooter />}
    </Wrapper>
  );
};

export default Layout;
