import {
  IBoardComment,
  IQuery,
} from "../../../../../path/to/types/generated/types";

export interface IPropsPre {
  data: Pick<IQuery, "fetchBoardComments"> | undefined;
  onLoadMore: () => void;
}

export interface IPropsPreItem {
  el: IBoardComment;
}
