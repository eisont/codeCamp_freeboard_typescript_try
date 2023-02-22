import withAuth from "../../src/components/commons/hocs/withAuth";
import Mypage from "../../src/components/units/mypage/mypage.container";

const MypagePage = () => {
  return <Mypage />;
};

export default withAuth(MypagePage);
