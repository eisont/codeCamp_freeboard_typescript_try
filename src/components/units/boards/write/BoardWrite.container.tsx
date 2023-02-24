import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../../../path/to/types/generated/types";
import BaordWriteUI from "./BoardWrite.presenter";
import { CREATE_BOARD } from "./BoardWrite.queries";
import {
  IBoardWrite,
  IBoardWriteAddressData,
  IBoardWriteData,
  IBoardWritefileType,
} from "../../../../../path/to/types/components/units/types";

const schema = yup.object({
  writer: yup.string().required("작성자는 필수 입력사항입니다."),
  password: yup.string().required("비밀번호는 필수 입력사항입니다."),
  title: yup.string().required("제목은 필수 입력사항입니다."),
  contents: yup.string(),
  addressDetail: yup.string(),
  youtubeUrl: yup.string().url("url을 정확히 작성해주세요."),
});

const updateschema = yup.object({
  password: yup.string().required("비밀번호는 필수 입력사항입니다."),
  title: yup.string(),
  contents: yup.string(),
  addressDeatail: yup.string(),
  youtubeUrl: yup.string().url("url을 정확히 작성해주세요."),
});

const BoardWrite = (pr: IBoardWrite) => {
  // ====================================================================================

  // const { data: loggedInUser } = useQuery<IQuery, "fetchUserLoggedIn">(
  //   FETCH_USER_LOGGED_IN
  // );
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
  // const [updateBoard] = useMutation<
  //   Pick<IMutation, "updateBoard">,
  //   IMutationUpdateBoardArgs
  // >(UPDATE_BOARD);

  // ====================================================================================

  useEffect(() => {
    if (pr.fetchBoardData?.fetchBoard.images?.length) {
      setFileUrls([...pr.fetchBoardData?.fetchBoard.images]);
    }
  }, [pr.fetchBoardData]);

  const router = useRouter();

  const [isActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [zonecode, setZonecode] = useState(
    pr.fetchBoardData?.fetchBoard?.boardAddress?.zipcode || ""
  );
  const [address, setAddress] = useState(
    pr.fetchBoardData?.fetchBoard?.boardAddress?.address || ""
  );
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(pr.isEdit ? updateschema : schema),
    mode: "onChange",
  });

  // modal 열기/닫기
  const onClickAddressSearch = () => {
    setIsOpen((prev) => !prev);
  };
  const onCompleteAddressSearch = (data: IBoardWriteAddressData) => {
    setAddress(data.address);
    setZonecode(data.zonecode);
    setIsOpen(false);
  };

  const onChangeFileUrls = (fileUrl: IBoardWritefileType, index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = String(fileUrl);
    setFileUrls(newFileUrls);
  };

  const onClickSubmit = async (data: IBoardWriteData) => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: data?.writer,
            password: data?.password,
            title: String(data?.title),
            contents: String(data?.contents),
            youtubeUrl: data?.youtubeUrl,
            boardAddress: {
              zipcode: zonecode,
              address,
              addressDetail: data?.addressDetail,
            },
            images: fileUrls,
          },
        },
      });
      alert(`${result.data?.createBoard?.title} 게시물 등록에 성공하였습니다.`);
      router.push(`/boards/${result.data?.createBoard?._id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onClickBack = () => {
    router.back();
  };

  return (
    <BaordWriteUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onChangeFileUrls={onChangeFileUrls}
      fetchBoardData={pr.fetchBoardData}
      fileUrls={fileUrls}
      onClickSubmit={onClickSubmit}
      onClickBack={onClickBack}
      onClickAddressSearch={onClickAddressSearch}
      onCompleteAddressSearch={onCompleteAddressSearch}
      isActive={isActive}
      isOpen={isOpen}
      isEdit={pr.isEdit}
      address={address}
      zonecode={zonecode}
    />
  );
};

export default BoardWrite;
