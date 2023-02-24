// 중고마켓 상세보기 styles

import styled from "@emotion/styled";
import { HeartOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 64px 0 0 0;
  width: 792px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SideInfo = styled.div`
  display: flex;
  align-items: center;
`;
export const Td = styled.div`
  margin: 0 10px 0 0;
  padding: 10px 20px;
  background: #ffd600;
  color: #000;
  font-weight: 900;
  font-size: 16px;
  color: #4f4f4f;
  border-radius: 10px;
`;

export const Hr = styled.div`
  margin: 20px auto;
  width: 100%;
  height: 1px;
  background: #dbdbdb;
`;

export const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemRemarks = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #dbdbdb;
`;
export const ItemName = styled.div`
  padding: 4px 0 0 0;
  font-size: 24px;
  font-weight: 700;
  color: #4f4f4f;
`;

export const HeartBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
export const LikeCount = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #000;
`;
export const OutLineHeart = styled(HeartOutlined)`
  margin: 0 0 4px 0;
  font-size: 30px;
  color: #ffd600;
`;

export const ItemPrice = styled.div`
  padding: 8px 0 0 0;
  width: 100%;

  font-weight: 700;
  font-size: 36px;
  color: #000;
`;

export const CarouselBox = styled.div`
  padding: 80px 0;
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

export const SectionContent = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  color: #4f4f4f;
`;

export const SectionTags = styled.div`
  margin: 40px 0;
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const Tags = styled.span`
  margin: 0 10px 0 0;
  font-size: 16px;
  font-weight: 500;
  color: #bdbdbd;
`;

export const MapBox = styled.div`
  padding: 60px 0;
`;

export const MenuButtons = styled.div`
  margin: 70px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GrayBt = styled.div`
  width: 180px;
  height: 52px;
  font-size: 16px;
  font-weight: 700;
  background: #dbdbdb;
  color: #4f4f4f;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    font-weight: 600;
    color: #fff;
  }
`;
export const YellowBt = styled.div`
  width: 180px;
  height: 52px;
  font-size: 16px;
  font-weight: 700;
  background: #ffd600;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    font-weight: 600;
    color: #fff;
  }
`;
