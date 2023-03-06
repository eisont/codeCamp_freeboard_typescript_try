import styled from "@emotion/styled";
import { IUserInfoPicure } from "../../../../path/to/types/components/commons/types";
import { Profilesvg } from "../../../commons/styles/Iconsvg";

const SellerPhoto = styled.img`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfoPicure = (pr: IUserInfoPicure) => {
  return (
    <>
      {pr.data === "null" ? (
        <Profilesvg width={pr.size} height={pr.size} fill="#bdbdbd" />
      ) : pr.data ? (
        <SellerPhoto
          src={
            pr.data?.includes("data:image") ||
            pr.data.split(".")[0] === "https://storage"
              ? pr.data
              : pr.data && `https://storage.googleapis.com/${pr.data}`
          }
          width={pr.size}
          height={pr.size}
        />
      ) : (
        <Profilesvg width={pr.size} height={pr.size} fill="#bdbdbd" />
      )}
    </>
  );
};

export default UserInfoPicure;
