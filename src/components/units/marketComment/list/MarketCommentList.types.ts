import {
  IQuery,
  IUseditemQuestion,
} from "../../../../../path/to/types/generated/types";

export interface IPropsPre {
  data: Pick<IQuery, "fetchUseditemQuestions"> | undefined;
  onLoadMore: () => void;
}

export interface IPropsPreItem {
  CommentEl: IUseditemQuestion;
}
