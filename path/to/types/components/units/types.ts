import { ApolloQueryResult } from "@apollo/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  IBoard,
  IBoardComment,
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
  IQueryFetchUseditemsArgs,
  IUseditem,
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../generated/types";

// =================================================================
// boardComment/list
export interface IBoardCommentsListUI {
  data: Pick<IQuery, "fetchBoardComments"> | undefined;
  onLoadMore: () => void;
}

export interface IIBoardCommentsListUIItem {
  BoardCommentEl: IBoardComment;
}

// =================================================================
// boardComment/write
export interface IBoardCommentWrite {
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  BoardCommentEl?: IBoardComment;
}

export interface IBoardCommentWriteUI {
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
  isEdit: boolean | undefined;
}

// =================================================================
// boards/detail
export interface IBoardDetailUI {
  fetchBoardData: Pick<IQuery, "fetchBoard"> | undefined;
  ImageCheck: string[] | undefined;
  youtubeCheck: boolean | undefined;
  onClickLikeCount: () => void;
  onClickDisLikeCount: () => void;
  onClickMoveToBoardList: () => void;
  onClickMoveToBoardEdit: () => void;
  onClickDelete: () => Promise<void>;
}

// =================================================================
// boards/list
export interface IBoardsListUI {
  keyword?: String;
  setKeyword: Dispatch<SetStateAction<string>>;
  startDate: String;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: String;
  setEndDate: Dispatch<SetStateAction<string>>;

  BoardsOfTheBestDate: IQuery | undefined;
  BoardsDate: Pick<IQuery, "fetchBoards"> | undefined;
  BoardsCountDate: Pick<IQuery, "fetchBoardsCount"> | undefined;
  refetchBoards: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  refetchBoardsCount: (
    variables?: Partial<IQueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsCount">>>;
  onClickMoveToBoardDetail: (id: string) => (_: any) => void;
  onClickMoveToBoardNew: () => void;
}

export interface IBoardsListUIStyle {
  isMatched: boolean;
}

export interface IPropsBestBoards {
  el: IBoard;
  onClickMoveToBoardDetail: (id: string) => (_: any) => void;
}

export interface IPropsPreItem {
  el: IBoard;
  index: number;
  keyword?: String | undefined | RegExp;
  onClickMoveToBoardDetail: (id: string) => (_: any) => void;
}

// =================================================================
// boards/write
export interface IBoardWrite {
  isEdit?: Boolean;
  fetchBoardData?: Pick<IQuery, "fetchBoard"> | undefined;
}
export interface IBoardWriteAddressData {
  address: string;
  zonecode: string;
}
export interface IBoardWriteData {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  addressDetail?: string;
}

export interface IBoardWritefileType {
  fileUrl: string[] | undefined;
}

export interface IBoardWriteUI {
  isActive: Boolean;
  isOpen: Boolean;
  isEdit?: Boolean;
  address: string;
  zonecode: string;
  fetchBoardData: Pick<IQuery, "fetchBoard"> | undefined;
  fileUrls: string[];
  formState: FormState<FieldValues>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onChangeFileUrls: (fileUrl: IBoardWritefileType, index: number) => void;
  onClickSubmit: (data: IBoardWriteData) => Promise<void>;
  onClickBack: () => void;
  onClickAddressSearch: () => void;
  onCompleteAddressSearch: (data: IBoardWriteAddressData) => void;
}

// =================================================================
// login
export interface ILoginData {
  email?: String;
  password?: String;
}

export interface ILoginUI {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  formState: FormState<FieldValues>;
  onClickHome: () => void;
  onClickSignup: () => void;
  onClickLogin: (data: ILoginData) => Promise<void>;
}

// =================================================================
// marketQuestion/list
export interface IMarketQuestionsListUI {
  data: Pick<IQuery, "fetchUseditemQuestions"> | undefined;
  onLoadMore: () => void;
}

export interface IMarketQuestionsListUIItem {
  QuestionEl: IUseditemQuestion;
}

// =================================================================
// marketQuestion/write
export interface IMarketQuestionWrite {
  isQuestionEdit?: boolean;
  setIsQuestionEdit?: Dispatch<SetStateAction<boolean>>;
  QuestionElID?: string;
}

export interface IMarketQuestionWriteUI {
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCancel: () => void;
  onClickComment: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  isQuestionEdit: boolean | undefined;
  contents: string;
}

// =================================================================
// marketQuestionAnswer/list
export interface IMarketQuestionAnswersList {
  QuestionElID: string;
}

export interface IMarketQuestionAnswersListUI {
  UseditemQuestionAnswersData:
    | Pick<IQuery, "fetchUseditemQuestionAnswers">
    | undefined;
  onLoadMore: () => JSX.Element | undefined;
  QuestionElID: string;
}

export interface IMarketQuestionAnswersListUIItem {
  QuestionElID: string;
  QuestionAnswerEl: IUseditemQuestionAnswer;
}

// =================================================================
// marketQuestionAnswer/write
export interface IMarketQuestionAnswerWrite {
  isAnswerEdit: boolean;
  setIsAnswerEdit: Dispatch<SetStateAction<boolean>>;
  QuestionElID?: string;
  QuestionAnswerElID?: string;
}

export interface IMarketQuestionAnswerWriteUI {
  onChangeContents: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickCancel: () => void;
  onClickAnswer: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  isAnswerEdit: boolean;
  contents: string;
}

// =================================================================
// markets/detail
export interface IMarketDetailUI {
  fetchUsedItemData: Pick<IQuery, "fetchUseditem"> | undefined;
  SoldAt: boolean;
  WriterCheck: boolean;
  ImageCheck: string[] | undefined;
  LocationCheck: boolean;
  onClickPickedCount: () => void;
  toggleNum: number | null | undefined;
  toggleCheck: boolean;
  onClickMoveToMarketList: () => void;
  onClickMoveToMarketEdit: () => void;
  onClickDelete: () => Promise<void>;
  onClickBuy: () => Promise<void>;
}

// =================================================================
// markets/list
export interface IMarketListUI {
  keyword?: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  isSoldout: boolean;
  BestProductData: IQuery | undefined;
  MarketsItemsData: Pick<IQuery, "fetchUseditems"> | undefined;
  MarketsItemsRefetch: (
    variables?: Partial<IQueryFetchUseditemsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditems">>>;
  onClickSoldItems: () => void;
  onClickSoldOutItems: () => void;
  onClickMoveToMarketDetail: (id: string) => (_: any) => void;
  onLoadMore: () => void;
  onClicMarketsWrite: () => void;
}

export interface IMarketListStyle {
  isSoldout?: boolean;
  isMatched?: boolean;
}

export interface IMarketListBestProducts {
  key: string;
  el: IUseditem;
  onClickMoveToMarketDetail: (id: string) => (_: any) => void;
}

export interface IMarketListUIItem {
  keyword?: string;
  key: string;
  el: IUseditem;
  onClickMoveToMarketDetail: (id: string) => (_: any) => void;
}

// =================================================================
// markets/write
export interface IMarketWrite {
  isEdit?: Boolean;
  fetchUseditemData?: Pick<IQuery, "fetchUseditem"> | undefined;
}
export interface IAddressData {
  address: string;
  zonecode: string;
}
export interface IData {
  writer?: string;
  password?: string;
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  addressDetail?: string;
}

export interface fileType {
  fileUrl: string[] | undefined;
}

export interface IMarketWriteUI {
  isOpen: boolean;
  isActive: boolean;
  address: string;
  addressDetail: string;
  hashArr: never[];
  fileUrls: string[];
  onChangeName: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeRemarks: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePrice: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (value: any) => void;
  onChangeTags: (event: any) => void;
  onChangeAddress: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAddressSearch: () => void;
  onCompleteAddressSearch: (data: any) => void;
  onChangeFileUrls: (fileUrl: any, index: any) => void;
  onClickSubmit: () => Promise<void>;
  onClickUpdate: () => Promise<void>;
  isEdit: Boolean | undefined;
  fetchUseditemData: Pick<IQuery, "fetchUseditem"> | undefined;
}

// =================================================================
// mypage
export interface IMypageUI {
  myMarketsItems: boolean;
  myPoint: boolean;
  myProfile: boolean;
  loggedInUserData: IQuery | undefined;
  onClickMyMarketItems: () => void;
  onClickMyPoint: () => void;
  onClickMyProfile: () => void;
}

// =================================================================
// signup
export interface ISignupData {
  email?: String;
  password?: String;
  passwordCh?: String;
  name?: String;
}

export interface ISignupUI {
  modal: boolean;
  errEmail: string;
  errPassword: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  formState: FormState<FieldValues>;
  onClickCreateUser: (data: ISignupData) => Promise<void>;
  onClickBack: () => void;
}
