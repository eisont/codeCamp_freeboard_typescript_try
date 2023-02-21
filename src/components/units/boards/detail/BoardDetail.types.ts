import { IQuery } from "../../../../../path/to/types/generated/types";

export interface IPropsPre {
  fetchBoardData: Pick<IQuery, "fetchBoard"> | undefined;
  ImageCheck: string[] | undefined;
  youtubeCheck: boolean | undefined;
  onClickLikeCount: () => void;
  onClickDisLikeCount: () => void;
  onClickMoveToBoardList: () => void;
  onClickMoveToBoardEdit: () => void;
  onClickDelete: () => Promise<void>;
}
