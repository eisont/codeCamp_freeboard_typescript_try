// boards 상세 페이지

import styled from "@emotion/styled";
import BoardDetail from "../../../src/components/units/boards/detail/BoardDetail.container";
import BoardCommentWrite from "../../../src/components/units/boardComment/write/BoardCommentWrite.container";
import BoardsCommentList from "../../../src/components/units/boardComment/list/BoardCommentsList.container";

const Wrapper = styled.div`
  padding: 80px 0;
`;

const BoardDetailPage = () => {
  return (
    <Wrapper>
      <BoardDetail />;
      <BoardCommentWrite />
      <BoardsCommentList />
    </Wrapper>
  );
};

export default BoardDetailPage;
