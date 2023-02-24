import { ApolloQueryResult } from "@apollo/client";
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
  IQueryFetchPointTransactionsOfBuyingArgs,
  IQueryFetchPointTransactionsOfLoadingArgs,
  IQueryFetchPointTransactionsOfSellingArgs,
  IQueryFetchUseditemsArgs,
  IQueryFetchUseditemsIPickedArgs,
  IQueryFetchUseditemsISoldArgs,
  Maybe,
} from "../../generated/types";

// =================================================================
// apollo
export interface IApolloSetting {
  children: ReactNode;
}

// =================================================================
// carousel/BestBoard
export interface IBestBoardCarousel {
  images?: Maybe<string[]> | undefined;
}

// =================================================================
// carousel/boardDetail
export interface IBoardDetailCarousel {
  images?: string[] | undefined;
}

// =================================================================
// carousel/marketDetail
export interface IMarketDetailCarousel {
  data: string[];
}

// =================================================================
// carousel/marketList
export interface IMarketListCarousel {
  data: string[];
}

// =================================================================
// info
export interface ISellerInfo {
  data: Pick<IQuery, "fetchUseditem"> | undefined;
}
export interface IUserInfoPicure {
  data: Maybe<string> | undefined;
  size: string;
}

// =================================================================
// kakaomap/show
export interface IKakaoMapShowPage {
  data: Pick<IQuery, "fetchUseditem"> | undefined;
}

// =================================================================
// layout
export interface ILayout {
  children: ReactNode;
}

// layout/header
export interface ILayoutHeaderUI {
  accessToken: string;
  userloggedInData: IQuery | undefined;
  onClickHome: () => void;
  onClickLogin: () => void;
  onClickMypage: () => void;
  onClickLogout: () => Promise<void>;
  onClickSignup: () => void;
  onClickModal: () => void;
  isModal: boolean;
  onClickChangeImage: () => void;
  onClickCharge: () => void;
}

// layout/loginmodal
export interface ILoginModal {
  Title: String;
}

// layout/navigation
export interface LayoutNavigationUIStyle {
  isMarkets?: boolean;
  isBoard?: boolean;
  isMyPage?: boolean;
}

// =================================================================
// mypageComponents/myMarketItems
export interface IMyMarketsItemsUI {
  myItems: boolean;
  myPicked: boolean;
  onClickMyItems: () => void;
  onClickMyPicked: () => void;
  IsoldData: Pick<IQuery, "fetchUseditemsISold"> | undefined;
  soldCountData: IQuery | undefined;
  ISoldRefetch: (
    variables?: Partial<IQueryFetchUseditemsISoldArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsISold">>>;
  pickData: Pick<IQuery, "fetchUseditemsIPicked"> | undefined;
  pickCountData: IQuery | undefined;
  IPickedRefetch: (
    variables?: Partial<IQueryFetchUseditemsIPickedArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsIPicked">>>;
  onClickID: (id: string) => (_: any) => void;
}

export interface IMyMarketsItemsUIStyles {
  myItems?: boolean;
  myPicked?: boolean;
}

// =================================================================
// mypageComponents/myPoint
export interface IMyPointUI {
  total: boolean;
  charge: boolean;
  buy: boolean;
  sell: boolean;
  onClickTotal: () => void;
  onClickCharge: () => void;
  onClickBuy: () => void;
  onClickSell: () => void;
}

export interface IMyPointUIStyles {
  total?: boolean;
  charge?: boolean;
  buy?: boolean;
  sell?: boolean;
  Status?: string;
  Amount?: string;
}

// =================================================================
// mypageComponents/myProfile
export interface IMyProfileUI {
  password: string;
  passwordCheck: string;
  showPresentPassword: boolean;
  showNewPassword: boolean;
  showCheckPassword: boolean;
  onClickResetPassword: () => Promise<void>;
  onClickShowPresentPassword: () => void;
  onClickShowNewPassword: () => void;
  onClickShowCheckPassword: () => void;
  onChangePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordCheck: (event: ChangeEvent<HTMLInputElement>) => void;
}

// paginations/01
export interface IPagination01 {
  data: number | undefined;
  refetch: (
    variables?:
      | Partial<IQueryFetchUseditemsIPickedArgs>
      | Partial<IQueryFetchUseditemsISoldArgs>
      | Partial<IQueryFetchBoardsArgs>
      | Partial<IQueryFetchPointTransactionsOfBuyingArgs>
      | Partial<IQueryFetchPointTransactionsOfLoadingArgs>
      | Partial<IQueryFetchPointTransactionsOfSellingArgs>
      | undefined
  ) =>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsIPicked">>>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsISold">>>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>
    | Promise<ApolloQueryResult<Pick<IQuery, "fetchPointTransactionsOfBuying">>>
    | Promise<
        ApolloQueryResult<Pick<IQuery, "fetchPointTransactionsOfLoading">>
      >
    | Promise<
        ApolloQueryResult<Pick<IQuery, "fetchPointTransactionsOfSelling">>
      >;
}

export interface IPagination01UI {
  startPage: number;
  lastPage: number;
  activedPage: number;
  onClickPage: (id: string) => (_: any) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}

export interface IPagination01UIStyle {
  isActive?: Boolean;
  rotate?: string;
}

// =================================================================
// searchbars/01
export interface ISearchbar01 {
  setKeyword: Dispatch<SetStateAction<string>>;
  refetch: (
    variables?: Partial<IQueryFetchUseditemsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditems">>>;
}

export interface ISearchbars01UI {
  onChangeSearchbar: (event: ChangeEvent<HTMLInputElement>) => void;
}

// =================================================================
// searchbars/02
export interface ISearchbar02 {
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
  setKeyword: Dispatch<SetStateAction<string>>;

  startDate: String;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: String;
  setEndDate: Dispatch<SetStateAction<string>>;
}

export interface ISearchbars02UI {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onClickSearch: (data: any) => void;
  onChangeStartDate: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeEndDate: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchDataType {
  search: String;
  startDate?: String;
  endDate?: String;
}

// =================================================================
// uploads/01
export interface IUploads01 {
  index: number;
  fileUrl: string;

  // import { fileType } from "../../../units/boards/write/BoardWrite.types";
  onChangeFileUrls: (fileUrl: fileType, index: number) => void;
  defaultFileUrl?: any;
}

export interface IUploads01UI {
  fileRef: MutableRefObject<HTMLInputElement | undefined>;
  fileUrl: string;
  defaultFileUrl: any;
  onClickUpload: () => void;
  onChangeFile: (event: any) => Promise<void>;
}

export interface IcheckValidationImage {
  size?: number;
  type: string;
}
