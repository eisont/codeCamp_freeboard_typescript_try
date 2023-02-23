import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  IBoardComment,
  IQuery,
} from "../../../../../path/to/types/generated/types";

export interface IPropsCon {
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  el?: IBoardComment;
}

export interface IPropPre {
  LoggedInUserData?: IQuery | undefined;
  onChangeStar: (value: number) => void;
  onChangeWriter: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickSubmit: () => Promise<void>;
  onClickCancel: () => void;
  onClickUpdate: () => Promise<void>;
  contents: string;
  writer: string;
  password: string;
  isEdit: boolean;
}
