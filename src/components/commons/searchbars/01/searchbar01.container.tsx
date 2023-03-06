import Searchbars01UI from "./searchbar01.presenter";
import _ from "lodash";
import { ChangeEvent } from "react";
import { ISearchbar01 } from "../../../../../path/to/types/components/commons/types";

const Searchbar01 = (pr: ISearchbar01) => {
  const getDebounce = _.debounce((data) => {
    pr.setKeyword(data);
    pr.refetch({ search: data, page: 1 });
  }, 1000);

  function onChangeSearchbar(event: ChangeEvent<HTMLInputElement>) {
    getDebounce(event.target.value);
  }

  return <Searchbars01UI onChangeSearchbar={onChangeSearchbar} />;
};

export default Searchbar01;
