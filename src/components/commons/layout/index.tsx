import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header/header.container";
import LayoutNavigation from "./navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const router = useRouter();

  const BoardListPage = ["/boards"];
  const isBoardListPage = BoardListPage.includes(router.asPath);

  return (
    <Wrapper>
      <LayoutHeader />
      <LayoutNavigation />
      {isBoardListPage && <LayoutBanner />}
      <div>{props.children}</div>
      <LayoutFooter />
    </Wrapper>
  );
};

export default Layout;
