// 중고마켓 목록 presenter

import InfiniteScroll from "react-infinite-scroller";
import Searchbar01 from "../../../commons/searchbars/01/Searchbar01.container";
import * as S from "./MarketsList.style";
import MarketListUIItem from "./MarketsList.presenterItem";
import MarketListBestProduct from "./MarketsList.presenterBestProduct";
import { IPropsPre } from "./MarketsList.types";

const MarketListUI = (pr: IPropsPre) => {
  if (!pr.MarketsItemsData) return <div />;

  return (
    <S.Wrapper>
      <S.BestBox>
        <S.BestText>베스트 상품</S.BestText>
        <S.BestProduct>
          {pr.BestProductData?.fetchUseditemsOfTheBest.map((el) => (
            <MarketListBestProduct
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
            판매중 상품
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
              <MarketListUIItem
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

export default MarketListUI;
