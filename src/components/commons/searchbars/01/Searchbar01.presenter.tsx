import { ISearchbars01UI } from "../../../../../path/to/types/components/commons/types";
import { SearchIconsvg } from "../../../../commons/styles/Iconsvg";
import * as S from "./searchbar01.style";

const Searchbars01UI = (pr: ISearchbars01UI) => {
  return (
    <S.Searchbar>
      <SearchIconsvg
        margin="0 11.51px 0 0"
        width="18"
        height="18"
        fill="#000"
      />
      <S.SearchbarInput
        placeholder="제품을 검색해 주세요."
        onChange={pr.onChangeSearchbar}
      />
    </S.Searchbar>
  );
};

export default Searchbars01UI;
