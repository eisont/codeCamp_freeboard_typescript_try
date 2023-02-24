import styled from "@emotion/styled";
import Slider from "react-slick";
import { v4 as uuidv4 } from "uuid";
import { IBestBoardCarousel } from "../../../../../path/to/types/components/commons/types";

const Slick = styled(Slider)`
  width: 282px;
  height: 120px;

  .slick-prev,
  .slick-next {
    display: none;
  }
`;

const Image = styled.img`
  width: 282px;
  height: 120px;
  object-fit: contain;
`;

const BestBoardCarousel = (pr: IBestBoardCarousel) => {
  const settings = {
    // 리스트 모양 보여주기
    dots: false,
    // 무제한으로 돌릴꺼야?
    infinite: true,
    // 넘어가는 속도
    speed: 5000,
    // 사진 몇개 보여줄꺼야?
    slidesToShow: 1,
    // 몇 개씩 넘길꺼야?
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0o0,
    // cssEase: 'ease',
  };

  const result = pr.images?.filter((ee: string) => ee);

  return (
    <Slick {...settings}>
      {result?.map((el) => (
        <Image key={uuidv4()} src={`https://storage.googleapis.com/${el}`} />
      ))}
    </Slick>
  );
};

export default BestBoardCarousel;
