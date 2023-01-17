import Searchbar02UI from "./Searchbar02.presenter";
import { useForm } from "react-hook-form";
import { ChangeEvent } from "react";
import { IPropsCon, SearchType } from "./Searchbar02.types";
import { getDate } from "../../../../commons/libraries/utiles";

const Searchbar02 = (props: IPropsCon) => {
  const { register, handleSubmit } = useForm();

  const onClickSearch = (data: SearchType) => {
    props.setKeyword(String(data?.search));
    props.refetchBoards({
      startDate: data?.startDate === "" ? "1900-01-01" : data?.startDate,
      endDate: data?.endDate === "" ? getDate(`${new Date()}`) : data?.endDate,
      search: String(data?.search),
    });
    props.refetchBoardsCount({
      startDate: data?.startDate === "" ? "1900-01-01" : data?.startDate,
      endDate: data?.endDate === "" ? getDate(`${new Date()}`) : data?.endDate,
      search: String(data?.search),
    });
  };

  const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    props.setStartDate(event.target.value);
  };
  const onChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    props.setEndDate(event.target.value);
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
