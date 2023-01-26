import Searchbars01UI from "./Searchbar01.presenter";
import _ from "lodash";
import { IPropsCon } from "./Searchbar01.types";
import { ChangeEvent } from "react";

const Searchbar01 = (pr: IPropsCon) => {
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
