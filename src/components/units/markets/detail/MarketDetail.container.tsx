import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
  IMutationDeleteUseditemArgs,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../../path/to/types/generated/types";
import MarketDetailUI from "./MarketDetail.presenter";
import {
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  DELETE_USED_ITEM,
  FETCH_USED_ITEM,
  FETCH_USED_ITEMS_IPICKED,
  FETCH_USER_LOGGED_IN,
  TOGGLE_USED_ITEM_PICK,
} from "./MarketDetail.queries";

const MarketDetail = () => {
  const router = useRouter();

  const { data: UserLoggedIn } = useQuery<IQuery, "fetchUserLoggedIn">(
    FETCH_USER_LOGGED_IN
  );

  const { data: fetchUsedItemData } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.useditemId) },
    onError: (errors) => {
      console.log("errors.message", errors.message);
      router.back();
    },
  });

  const [toggleNum, setToggleNum] = useState(
    fetchUsedItemData?.fetchUseditem?.pickedCount
  );

  const { data } = useQuery(FETCH_USED_ITEMS_IPICKED, {
    variables: { search: "" },
  });

  const PickCheck = Boolean(
    data?.fetchUseditemsIPicked
      .map((el: any) => el._id)
      .filter((el: any) => el === router.query.useditemId).length
  );
  const [toggleCheck, setToggleCheck] = useState(PickCheck);

  const [toggleUseditemPick] = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK);

  const onClickPickedCount = async () => {
    if (PickCheck) {
      setToggleCheck(false);
    } else {
      setToggleCheck(true);
    }

    try {
      const result = await toggleUseditemPick({
        variables: { useditemId: String(router.query.useditemId) },

        refetchQueries: [
          {
            query: FETCH_USED_ITEM,
            variables: { useditemId: String(router.query.useditemId) },
          },
        ],
      });
      setToggleNum(Number(result.data?.toggleUseditemPick));
    } catch (errors: any) {
      alert(errors.message);
    }
  };

  const ImageCheck = fetchUsedItemData?.fetchUseditem?.images?.filter(
    (el: string) => el
  );

  const LocationCheck = Boolean(
    fetchUsedItemData?.fetchUseditem?.useditemAddress?.lat &&
      fetchUsedItemData?.fetchUseditem?.useditemAddress?.lng
  );

  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM);

  const [createPointTransactionOfBuyingAndSelling] = useMutation<
    Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

  const onClickMoveToMarketList = () => {
    router.push(`../markets`);
  };

  const onClickMoveToMarketEdit = () => {
    router.push(`../markets/${router.query.useditemId}/edit`);
  };

  const onClickDelete = async () => {
    try {
      await deleteUseditem({
        variables: {
          useditemId: String(router.query.useditemId),
        },
      });
      Modal.success({ content: `게시글이 삭제되었습니다.` });
      router.back();
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };

  const onClickBuy = async () => {
    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: {
          useritemId: String(router.query.useditemId),
        },
      });
      alert(`${fetchUsedItemData?.fetchUseditem?.name}을 구매하셨습니다.`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <MarketDetailUI
      // 게시판의 정보를 담은 객체 data
      fetchUsedItemData={fetchUsedItemData}
      SoldAt={fetchUsedItemData?.fetchUseditem?.soldAt}
      WriterCheck={
        UserLoggedIn?.fetchUserLoggedIn?.email ===
        fetchUsedItemData?.fetchUseditem?.seller?.email
      }
      ImageCheck={ImageCheck}
      LocationCheck={LocationCheck}
      // pickedCount 버튼
      onClickPickedCount={onClickPickedCount}
      toggleNum={toggleNum}
      toggleCheck={toggleCheck}
      // 목록으로 버튼
      onClickMoveToMarketList={onClickMoveToMarketList}
      // 수정하기로 버튼
      onClickMoveToMarketEdit={onClickMoveToMarketEdit}
      // 삭제 버튼
      onClickDelete={onClickDelete}
      // 구매 버튼
      onClickBuy={onClickBuy}
    />
  );
};

export default MarketDetail;
