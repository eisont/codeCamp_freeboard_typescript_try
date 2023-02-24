import { useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { IMarketWrite } from "../../../../../path/to/types/components/units/types";
import MarketWriteUI from "./MarketWrite.presenter";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from "./MarketWrite.queries";

const MarketWrite = (pr: IMarketWrite) => {
  const router = useRouter();

  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);

  const [isOpen, setIsOpen] = useState(false);
  const [isActive] = useState(false);

  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [price, setPrice] = useState("");
  const [contents, setContents] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [lat] = useState(0);
  const [lng] = useState(0);
  const [hashArr, setHashArr] = useState([]);

  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeRemarks = (event: ChangeEvent<HTMLInputElement>) => {
    setRemarks(event.target.value);
  };
  const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };
  const onChangeContents = (value: any) => {
    setContents(value === `<p><br/></p>` ? "" : value);
  };
  const onChangeTags = (event: any) => {
    if (event.keyCode === 32 && event.target.value !== " ") {
      setHashArr([...hashArr, "#" + event.target.value]);
      event.target.value = "";
    }
  };

  const onCompleteAddressSearch = (data: any) => {
    setAddress(data.Address);
    setIsOpen(false);
  };
  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onClickAddressSearch = () => {
    setIsOpen((prev) => !prev);
  };
  const onChangeFileUrls = (fileUrl: any, index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
  };

  const onClickSubmit = async () => {
    if (!(name && remarks && price)) {
      alert("모두 입력해주세요!");
      return;
    }
    try {
      const result = await createUseditem({
        variables: {
          createUseditemInput: {
            name,
            remarks,
            contents,
            price,
            tags: hashArr,
            useditemAddress: {
              address,
              addressDetail,
              lat,
              lng,
            },
            images: fileUrls,
          },
        },
      });
      alert("상품 등록에 성공했습니다.");
      router.push(`markets/${result.data?.createUseditem._id}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(
      pr.fetchUseditemData?.fetchUseditem?.images
    );
    const isChangedFiles = currentFiles !== defaultFiles;

    if (!name && !remarks && !price) {
      Modal.error({ content: "수정한 내용이 없습니다." });
      return;
    }

    const updateUseditemInput = {
      name: "",
      remarks: "",
      contents: "",
      price: "",
      useditemAddress: {
        lat: 0,
        lng: 0,
        address: "",
        addressDetail: "",
      },
      images: {},
    };
    if (name) updateUseditemInput.name = name;
    if (remarks) updateUseditemInput.remarks = remarks;
    if (contents) updateUseditemInput.contents = contents;
    if (price) updateUseditemInput.price = price;
    if (lat || lng || address || addressDetail) {
      if (lat) updateUseditemInput.useditemAddress.lat = lat;
      if (lng) updateUseditemInput.useditemAddress.lng = lng;
      if (address) updateUseditemInput.useditemAddress.address = address;
      if (addressDetail)
        updateUseditemInput.useditemAddress.addressDetail = addressDetail;
    }
    if (isChangedFiles) updateUseditemInput.images = fileUrls;

    try {
      await updateUseditem({
        variables: {
          updateUseditemInput,
          useditenId: String(router.query.useditemId),
        },
      });
      Modal.success({ content: "게시글 수정에 성공하였습니다. " });
      router.push(`/market/${router.query.useditemId}`);
    } catch (error: any) {
      Modal.error({ content: error.message });
    }
  };
  return (
    <MarketWriteUI
      isOpen={isOpen}
      isActive={isActive}
      address={address}
      addressDetail={addressDetail}
      hashArr={hashArr}
      fileUrls={fileUrls}
      onChangeName={onChangeName}
      onChangeRemarks={onChangeRemarks}
      onChangePrice={onChangePrice}
      onChangeContents={onChangeContents}
      onChangeTags={onChangeTags}
      onChangeAddress={onChangeAddress}
      onChangeAddressDetail={onChangeAddressDetail}
      onClickAddressSearch={onClickAddressSearch}
      onCompleteAddressSearch={onCompleteAddressSearch}
      onChangeFileUrls={onChangeFileUrls}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      isEdit={pr.isEdit}
      fetchUseditemData={pr.fetchUseditemData}
    />
  );
};

export default MarketWrite;
