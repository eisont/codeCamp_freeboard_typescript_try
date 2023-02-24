import withAuth from "../../../src/components/commons/hocs/withAuth";
import MarketWrite from "../../../src/components/units/markets/write/MarketWrite.container";

const MarketWritePage = () => {
  return <MarketWrite />;
};

export default withAuth(MarketWritePage);
