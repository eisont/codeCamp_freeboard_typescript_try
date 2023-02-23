import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IUseditemQuestionAnswer } from "../../../../../path/to/types/generated/types";

export interface IPropsAnswerWrite {
  isEditSub: boolean;
  setIsEditSub: Dispatch<SetStateAction<boolean>>;
  CommentElID?: string;
  CommentAnswerEl?: IUseditemQuestionAnswer;
}

export interface IPropsAnswerWritePre {
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCancel: () => void;
  onClickAnswer: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  isEditSub: boolean;
  contents: string;
}
