import { IUploads01UI } from "../../../../../path/to/types/components/commons/types";
import * as S from "./upload01.style";

const Uploads01UI = (pr: IUploads01UI) => {
  return (
    <>
      {pr.fileUrl && (
        <S.UploadImage
          onClick={pr.onClickUpload}
          src={`https://storage.googleapis.com/${pr.fileUrl}`}
        />
      )}

      {!pr.fileUrl && (
        <S.UploadButton onClick={pr.onClickUpload} type="button">
          <>+</>
          <>Upload</>
        </S.UploadButton>
      )}

      <S.UploadFileHidden
        type="file"
        ref={pr.fileRef}
        onChange={pr.onChangeFile}
      />
    </>
  );
};

export default Uploads01UI;
