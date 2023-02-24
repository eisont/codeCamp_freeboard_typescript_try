// 게시판 상세보기 styles

import styled from "@emotion/styled";
import ReactPlayer from "react-player";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Contents = styled.div`
  width: 1200px;
  padding: 80px 120px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid #bdbdbd;
  box-shadow: 0px 0px 10px #bdbdbd;
`;
export const Header = styled.div`
  width: 996px;
  margin: 0 auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #bdbdbd;
  display: flex;
  justify-content: space-between;
`;

export const UserInformation = styled.div`
  display: flex;
  align-items: center;
`;
export const UserProfilePhoto = styled.img`
  width: 47px;
  margin-right: 20px;
`;
export const UserName = styled.div`
  font-size: 24px;
  font-weight: 900;
`;
export const CreatedAt = styled.div`
  color: #828282;
`;

export const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const Body = styled.div`
  width: 996px;
  margin: 0 auto;
`;

export const SectionText = styled.div`
  margin: 80px 0 40px;
  font-weight: 900;
  font-size: 36px;
`;

export const ImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 296px;
  height: 296px;
  object-fit: contain;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SectionContent = styled.div`
  width: 996px;

  overflow: hidden;
  white-space: pre-wrap;

  font-size: 16px;
  font-weight: 400;
  margin: 40px 0 120px 0;
`;

export const SectionVideoBox = styled.div`
  margin: 0 0 162px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SectionVideoURL = styled(ReactPlayer)`
  margin: auto;
`;

export const LikeButtonBox = styled.div`
  width: 996px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LikeButton = styled.div`
  flex-direction: column;
  text-align: center;
  margin-right: 40px;

  &:hover {
    cursor: pointer;
  }
`;
export const LikeNumber = styled.div`
  color: #ffd600;
  font-size: 25px;
  font-weight: 900;
  // background: #f0f;
  cursor: default;
`;

export const DisLikeButton = styled.div`
  flex-direction: column;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;
export const DisLikeNumber = styled.div`
  color: #828282;
  font-size: 25px;
  font-weight: 900;
  cursor: default;
`;

export const MenuButtons = styled.div`
  margin: 80px 0;
  display: flex;
  align-items: center;
`;
export const Button = styled.button`
  margin: 0 24px 0 0;
  width: 180px;
  height: 45px;
  font-size: 16px;
  font-weight: 600;
  display: inline;
  background: #fff;
  border: 1px solid #bdbdbd;

  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: gold;
    border-color: white;
  }
`;

export const WrapperHr = styled.div`
  margin: 0 0 40px 0;
  width: 1200px;
  height: 1px;
  background: #bdbdbd;
`;
