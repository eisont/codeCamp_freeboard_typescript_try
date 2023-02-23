import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IPropsCommentWrite {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  CommentElID: string;
}

export interface IPropsCommentWritePre {
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCancel: () => void;
  onClickComment: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  isEdit: boolean;
  contents: string;
}
