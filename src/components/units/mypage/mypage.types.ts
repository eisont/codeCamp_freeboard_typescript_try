import { IUser } from "../../../../path/to/types/generated/types";

export interface IPropsPre {
  myMarketsItems: boolean;
  myPoint: boolean;
  myProfile: boolean;
  loggedInUser: IUser | undefined;
  // onClickResult:;
  onClickMyMarketItems: () => void;
  onClickMyPoint: () => void;
  onClickMyProfile: () => void;
}
