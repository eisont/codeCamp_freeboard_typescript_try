import * as S from "./myPoint.styles";
import PointFullHistory from "./pointFullHistory";
import PointCharge from "./pointCharge";
import PointBuy from "./pointBuy";
import PointSell from "./pointSell";
import { IMyPointUI } from "../../../../../path/to/types/components/commons/types";

const MyPointUI = (pr: IMyPointUI) => {
  return (
    <S.Section>
      <S.SectionHead>
        <S.MenuBox>
          <S.Total onClick={pr.onClickTotal} total={pr.total}>
            전체내역
          </S.Total>
          <S.Hrs />
          <S.Charge onClick={pr.onClickCharge} charge={pr.charge}>
            충전내역
          </S.Charge>
          <S.Hrs />
          <S.Buy onClick={pr.onClickBuy} buy={pr.buy}>
            구매내역
          </S.Buy>
          <S.Hrs />
          <S.Sell onClick={pr.onClickSell} sell={pr.sell}>
            판매내역
          </S.Sell>
        </S.MenuBox>
        {/* <Searchbars01 /> 검색이 됩니다. */}
      </S.SectionHead>

      {pr.total && <PointFullHistory />}

      {pr.charge && <PointCharge />}

      {pr.buy && <PointBuy />}

      {pr.sell && <PointSell />}
    </S.Section>
  );
};

export default MyPointUI;
