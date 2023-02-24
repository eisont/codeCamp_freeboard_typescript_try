import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
  IQueryFetchUseditemsISoldArgs,
} from "../../../../../path/to/types/generated/types";
import MyMarketsItemsUI from "./myMarketItems.presenter";
import {
  FETCH_USED_ITEMS_ISOLD,
  FETCH_USED_ITEMS_COUNT_ISOLD,
  FETCH_USED_ITEMS_IPICKED,
  FETCH_USED_ITEMS_COUNT_IPICKED,
} from "./myMarketItems.queries";

const MyMarketsItems = () => {
  const router = useRouter();

  const [myItems, setMyItems] = useState(true);
  const [myPicked, setMyPicked] = useState(false);

  const onClickMyItems = () => {
    setMyItems(true);
    setMyPicked(false);
  };
  const onClickMyPicked = () => {
    setMyItems(false);
    setMyPicked(true);
  };

  const { data: IsoldData, refetch: ISoldRefetch } = useQuery<
    Pick<IQuery, "fetchUseditemsISold">,
    IQueryFetchUseditemsISoldArgs
  >(FETCH_USED_ITEMS_ISOLD);

  const { data: soldCountData } = useQuery<IQuery, "fetchUseditemsCountISold">(
    FETCH_USED_ITEMS_COUNT_ISOLD
  );

  const { data: pickData, refetch: IPickedRefetch } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_IPICKED, { variables: { search: "" } });

  const { data: pickCountData } = useQuery<
    IQuery,
    "fetchUseditemsCountIPicked"
  >(FETCH_USED_ITEMS_COUNT_IPICKED);

  const onClickID = (id: string) => (_: any) => {
    router.push(`/markets/${id}`);
  };

  return (
    <MyMarketsItemsUI
      myItems={myItems}
      myPicked={myPicked}
      onClickMyItems={onClickMyItems}
      onClickMyPicked={onClickMyPicked}
      IsoldData={IsoldData}
      soldCountData={soldCountData}
      ISoldRefetch={ISoldRefetch}
      pickData={pickData}
      pickCountData={pickCountData}
      IPickedRefetch={IPickedRefetch}
      onClickID={onClickID}
    />
  );
};

export default MyMarketsItems;
