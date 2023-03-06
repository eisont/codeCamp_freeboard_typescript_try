import Searchbar02UI from "./searchbar02.presenter";
import { useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import { getDateComma } from "../../../../commons/libraries/utils";
import {
  ISearchbar02,
  SearchDataType,
} from "../../../../../path/to/types/components/commons/types";

const Searchbar02 = (pr: ISearchbar02) => {
  const { register, handleSubmit } = useForm();

  const onClickSearch = (data: SearchDataType) => {
    const searchData = {
      startDate: !data?.startDate ? "1900.01.01" : data?.startDate,
      endDate: !data?.endDate ? getDateComma(`${new Date()}`) : data?.endDate,
      search: String(data?.search),
    };

    pr.setKeyword(String(data?.search));
    pr.refetch(searchData);
    pr.refetchCount(searchData);
  };

  const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    pr.setStartDate(event.target.value);
  };
  const onChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    pr.setEndDate(event.target.value);
  };

  return (
    <Searchbar02UI
      register={register}
      handleSubmit={handleSubmit}
      onClickSearch={onClickSearch}
      onChangeStartDate={onChangeStartDate}
      onChangeEndDate={onChangeEndDate}
    />
  );
};

export default Searchbar02;
