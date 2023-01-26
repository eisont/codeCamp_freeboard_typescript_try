import Searchbar02UI from "./Searchbar02.presenter";
import { useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import { IPropsCon, SearchType } from "./Searchbar02.types";
import { getDate } from "../../../../commons/libraries/utiles";

const Searchbar02 = (pr: IPropsCon) => {
  const { register, handleSubmit } = useForm();

  const onClickSearch = (data: SearchType) => {
    pr.setKeyword(String(data?.search));
    pr.refetch({
      startDate: data?.startDate === "" ? "1900-01-01" : data?.startDate,
      endDate: data?.endDate === "" ? getDate(`${new Date()}`) : data?.endDate,
      search: String(data?.search),
    });
    pr.refetchCount({
      startDate: data?.startDate === "" ? "1900-01-01" : data?.startDate,
      endDate: data?.endDate === "" ? getDate(`${new Date()}`) : data?.endDate,
      search: String(data?.search),
    });
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
