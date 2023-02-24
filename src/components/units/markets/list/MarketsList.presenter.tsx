// 중고마켓 목록 presenter

import InfiniteScroll from "react-infinite-scroller";
import * as S from "./MarketsList.styles";
import MarketsListUIItem from "./MarketsList.presenterItem";
import MarketListBestProducts from "./MarketsList.presenterBestProduct";
import { IMarketListUI } from "../../../../../path/to/types/components/units/types";
import Searchbar01 from "../../../commons/searchbars/01/searchbar01.container";

const MarketsListUI = (pr: IMarketListUI) => {
  if (!pr.MarketsItemsData) return <div />;

  return (
    <S.Wrapper>
      <S.BestBox>
        <S.BestText>베스트 상품</S.BestText>
        <S.BestProduct>
          {pr.BestProductData?.fetchUseditemsOfTheBest.map((el) => (
            <MarketListBestProducts
              key={el._id}
              el={el}
              onClickMoveToMarketDetail={pr.onClickMoveToMarketDetail}
            />
          ))}
        </S.BestProduct>
      </S.BestBox>

      <S.SearchBox>
        <S.MenuBox>
          <S.SoldMenu onClick={pr.onClickSoldItems} isSoldout={pr.isSoldout}>
            판매 중 상품
          </S.SoldMenu>
          <S.SoldOutMenu
            onClick={pr.onClickSoldOutItems}
            isSoldout={pr.isSoldout}
          >
            판매된 상품
          </S.SoldOutMenu>
        </S.MenuBox>
        <Searchbar01
          setKeyword={pr.setKeyword}
          refetch={pr.MarketsItemsRefetch}
        />
      </S.SearchBox>

      <S.MainBox>
        <S.InfiniteScrollBox>
          <InfiniteScroll
            pageStart={0}
            loadMore={pr.onLoadMore}
            hasMore={true}
            useWindow={false}
          >
            {pr.MarketsItemsData?.fetchUseditems.map((el) => (
              <MarketsListUIItem
                key={el._id}
                el={el}
                keyword={pr.keyword}
                onClickMoveToMarketDetail={pr.onClickMoveToMarketDetail}
              />
            ))}
          </InfiniteScroll>
        </S.InfiniteScrollBox>
      </S.MainBox>

      <S.JustifyBox>
        <S.WriteItem onClick={pr.onClicMarketsWrite}>상품 등록하기</S.WriteItem>
      </S.JustifyBox>
    </S.Wrapper>
  );
};

export default MarketsListUI;
