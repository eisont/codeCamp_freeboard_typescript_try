import { ISearchbars02UI } from "../../../../../path/to/types/components/commons/types";
import * as S from "./searchbar02.style";

const Searchbars02UI = (props: ISearchbars02UI) => {
  return (
    <S.Wrapper onSubmit={props.handleSubmit(props.onClickSearch)}>
      <S.Searchbar>
        <S.SearchIcon />
        <S.SearchbarInput
          placeholder="제목을 검색해주세요."
          {...props.register("search")}
        />
      </S.Searchbar>

      <S.SearchDate
        type="date"
        placeholder="YY.MM.DD"
        {...props.register("startDate")}
      />
      <S.SearchDate
        type="date"
        placeholder="YY.MM.DD"
        {...props.register("endDate")}
      />
      <S.SearchBt>검색하기</S.SearchBt>
    </S.Wrapper>
  );
};

export default Searchbars02UI;
