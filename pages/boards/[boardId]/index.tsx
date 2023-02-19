// boards 상세 페이지

import styled from "@emotion/styled";
import BoardCommentList from "../../../src/components/units/boardcomment/list/BoardCommentList.container";
import BoardCommentWrite from "../../../src/components/units/boardcomment/write/BoardCommentWrite.container";
import BoardDetail from "../../../src/components/units/boards/detail/BoardDetail.container";

const Wrapper = styled.div`
  padding: 80px 0;
`;

const BoardDetailPage = () => {
  return (
    <Wrapper>
      <BoardDetail />;
      <BoardCommentWrite />
      <BoardCommentList />
    </Wrapper>
  );
};

export default BoardDetailPage;
