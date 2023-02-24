import { useState } from "react";
import { IPagination01 } from "../../../../../path/to/types/components/commons/types";
import Pagination01UI from "./pagination01.presenter";

const Pagination01 = (pr: IPagination01) => {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = pr.data ? Math.ceil(Number(pr.data) / 10) : 0;

  const onClickPage = (id: string) => (_: any) => {
    const activedPage = Number(id);
    setActivedPage(activedPage);
    pr.refetch({ page: activedPage });
  };

  const onClickPrevPage = () => {
    if (startPage <= 1) return;
    setStartPage((prev) => prev - 10);
    setActivedPage(startPage - 10);
    pr.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 > lastPage) return;
    setStartPage((prev) => prev + 10);
    setActivedPage(startPage + 10);
    pr.refetch({ page: startPage + 10 });
  };

  return (
    <Pagination01UI
      startPage={startPage}
      lastPage={lastPage}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    />
  );
};

export default Pagination01;
