import styled from "@emotion/styled";
import { IQuery } from "../../../../path/to/types/generated/types";
import { getDateComma } from "../../../commons/libraries/utils";
import UserInfoPicure from "./userInfoPicture";

const SellerInfoBox = styled.div`
  display: flex;
  align-items: center;
`;
const SellerInfoContents = styled.div`
  margin: 0 0 0 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const SellerName = styled.div`
  padding: 0 0 2px 0;
  font-size: 16px;
  font-weight: 700;
`;
const CreatedAt = styled.div`
  color: #828282;
  font-weight: 400;
  font-size: 12px;
`;

interface ITypes {
  data: Pick<IQuery, "fetchUseditem"> | undefined;
}

const SellerInfo = (pr: ITypes) => {
  return (
    <SellerInfoBox>
      <UserInfoPicure
        size="40"
        data={pr.data?.fetchUseditem?.seller?.picture}
      />
      <SellerInfoContents>
        <SellerName>
          {pr.data?.fetchUseditem?.seller?.name.length === 0
            ? "판매자 이름 없음"
            : pr.data?.fetchUseditem?.seller?.name}
        </SellerName>
        <CreatedAt>
          Date: {getDateComma(pr.data?.fetchUseditem?.createdAt)}
        </CreatedAt>
      </SellerInfoContents>
    </SellerInfoBox>
  );
};

export default SellerInfo;
