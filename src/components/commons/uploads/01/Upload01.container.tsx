import { useMutation } from "@apollo/client";
import { ChangeEvent, useRef } from "react";
import { IUploads01 } from "../../../../../path/to/types/components/commons/types";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../../../path/to/types/generated/types";
import Uploads01UI from "./upload01.presenter";
import { UPLOAD_FILE } from "./upload01.queries";
import { checkValidationImage } from "./upload01.validation";

const Uploads01 = (pr: IUploads01) => {
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const fileRef = useRef<HTMLInputElement>();

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = checkValidationImage(event.target.files?.[0]);
    if (!file) return;

    try {
      const result = await uploadFile({ variables: { file } });
      pr.onChangeFileUrls(result?.data?.uploadFile.url, pr.index);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={pr.fileUrl}
      defaultFileUrl={pr.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
};

export default Uploads01;
