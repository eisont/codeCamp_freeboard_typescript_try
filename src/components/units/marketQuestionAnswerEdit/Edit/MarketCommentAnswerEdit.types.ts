import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IUseditemQuestionAnswer } from "../../../../../path/to/types/generated/types";

export interface IPropsMarketCommentAnswerUpdate {
  CommentAnswerEl: IUseditemQuestionAnswer;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
}

export interface IPropsMarketCommentAnswerUpdatePre {
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickUpdate: () => Promise<void>;
  isUpdate: boolean;
  CommentAnswerEl: IUseditemQuestionAnswer;
  contents: string;
}
