import styled from "@emotion/styled";
import Slider from "react-slick";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(0, 0, 0, 0.2);
`;
const Slick = styled(Slider)`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 400px;

  .slick-prev {
    z-index: 1;
    left: 20%;

    &::before {
      font-size: 48px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .slick-next {
    z-index: 1;
    right: 20%;

    &::before {
      font-size: 48px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .slick-dots {
    bottom: 19px;

    li button:before {
      color: #fff;
      font-size: 18px;
    }
  }
`;
const DogImg = styled.img`
  height: 400px;
  object-fit: cover;
`;
const LayoutBanner = () => {
  const settings = {
    // 리스트 모양 보여주기
    dots: true,
    // 무제한으로 돌릴꺼야?
    infinite: false,
    // 넘어가는 속도
    speed: 1000,
    // 사진 몇개 보여줄꺼야?
    slidesToShow: 1,
    // 몇 개씩 넘길꺼야?
    slidesToScroll: 1,
    autoplay: true,
    // autoplaySpeed: 0o0,
    cssEase: "ease",
  };

  return (
    <Wrapper>
      <Slick {...settings}>
        <DogImg src="./carousel_1.png" />
        <DogImg src="./carousel_2.png" />
        <DogImg src="./carousel_3.png" />
        <DogImg src="./carousel_4.png" />
      </Slick>
    </Wrapper>
  );
};

export default LayoutBanner;
