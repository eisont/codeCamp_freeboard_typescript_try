import { ApolloQueryResult } from "@apollo/client";
import {
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
  IQueryFetchUseditemsISoldArgs,
  IUseditem,
} from "../../../../../path/to/types/generated/types";

export interface IPropsPre {
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

export interface IPropsStyles {
  myItems?: boolean;
  myPicked?: boolean;
}
