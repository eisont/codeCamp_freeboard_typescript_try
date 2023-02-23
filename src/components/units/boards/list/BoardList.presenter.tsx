// 게시판 목록 presenter

import * as S from "./BoardList.style";
import BoardListBestBoards from "./BoardList.presenterBestBoards";
import { PencilFillsvg } from "../../../../commons/styles/Iconsvg";
import Paginations01 from "../../../commons/paginations/01/Pagination01.container";
import Searchbars02 from "../../../commons/searchbars/02/Searchbar02.container";
import { IPropsPre } from "./BoardList.types";
import BoardListItem from "./BoardList.presenterItmes";

const BoardListUI = (pr: IPropsPre) => {
  return (
    <S.Wrapper>
      <S.BestText>베스트 게시글</S.BestText>
      <S.BestBoards>
        {pr.BoardsOfTheBestDate?.fetchBoardsOfTheBest.map((el: any) => (
          <BoardListBestBoards
            key={el._id}
            el={el}
            onClickMoveToBoardDetail={pr.onClickMoveToBoardDetail}
          />
        ))}
      </S.BestBoards>

      <S.SectionBox>
        <S.SearchBox>
          <Searchbars02
            refetch={pr.refetchBoards}
            refetchCount={pr.refetchBoardsCount}
            setKeyword={pr.setKeyword}
            startDate={pr.startDate}
            setStartDate={pr.setStartDate}
            endDate={pr.endDate}
            setEndDate={pr.setEndDate}
          />
        </S.SearchBox>

        <S.TableTop>
          <S.Grid>
            <S.HText>번호</S.HText>
            <S.HText>제목</S.HText>
            <S.HText>작성자</S.HText>
            <S.HText>날짜</S.HText>
          </S.Grid>

          {pr.BoardsDate?.fetchBoards.map((el: any, index: number) => (
            <BoardListItem
              key={el._id}
              el={el}
              index={index}
              keyword={pr.keyword}
              onClickMoveToBoardDetail={pr.onClickMoveToBoardDetail}
            />
          ))}
        </S.TableTop>

        <S.Footer>
          <Paginations01
            data={pr.BoardsCountDate?.fetchBoardsCount}
            refetch={pr.refetchBoards}
          />

          <S.Button onClick={pr.onClickMoveToBoardNew}>
            <PencilFillsvg
              margin="0 11px 0 0"
              width="18"
              height="18"
              fill="#000"
            />
            게시물 등록하기
          </S.Button>
        </S.Footer>
      </S.SectionBox>
    </S.Wrapper>
  );
};

export default BoardListUI;
