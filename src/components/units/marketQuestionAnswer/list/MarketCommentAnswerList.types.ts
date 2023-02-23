import { Dispatch, SetStateAction } from "react";
import {
  IQuery,
  IUseditemQuestionAnswer,
} from "../../../../../path/to/types/generated/types";

export interface IPropsCommentAnswerList {
  isEditSub: boolean;
  setIsEditSub: Dispatch<SetStateAction<boolean>>;
  CommentElID: string;
}

export interface IPropsCommentAnswerListPre {
  isEditSub: boolean;
  setIsEditSub: Dispatch<SetStateAction<boolean>>;
  UseditemQuestionAnswersData:
    | Pick<IQuery, "fetchUseditemQuestionAnswers">
    | undefined;
  onLoadMore: () => JSX.Element | undefined;
  CommentElID: string;
}

export interface IPropsCommentAnswerListItem {
  key: string;
  CommentAnswerEl: IUseditemQuestionAnswer;
  CommentElID: string;
}
