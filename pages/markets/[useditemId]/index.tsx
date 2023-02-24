import MarketDetail from "../../../src/components/units/markets/detail/MarketDetail.container";
import withAuth from "../../../src/components/commons/hocs/withAuth";
import MarketQuestionWrite from "../../../src/components/units/marketQuestion/write/MarketQuestionWrite.container";
import MarketQuestionsList from "../../../src/components/units/marketQuestion/list/MarketQuestionsList.container";

const MarketDetailPage = () => {
  return (
    <>
      <MarketDetail />
      <MarketQuestionWrite />
      <MarketQuestionsList />
    </>
  );
};

export default withAuth(MarketDetailPage);
