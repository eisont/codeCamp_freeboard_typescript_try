// 중고마켓 댓글 목록 presenter
import InfiniteScroll from "react-infinite-scroller";
import MarketQuestionsListUIItem from "./MarketQuestionsList.presenterItem";
import { v4 as uuidv4 } from "uuid";
import { IMarketQuestionsListUI } from "../../../../../path/to/types/components/units/types";

const MarketQuestionsListUI = (pr: IMarketQuestionsListUI) => {
  if (!pr.data) return <div />;

  return (
    <InfiniteScroll pageStart={0} loadMore={pr.onLoadMore} hasMore={true}>
      {pr.data?.fetchUseditemQuestions?.map((QuestionEl) => (
        <MarketQuestionsListUIItem key={uuidv4()} QuestionEl={QuestionEl} />
      ))}
    </InfiniteScroll>
  );
};

export default MarketQuestionsListUI;
