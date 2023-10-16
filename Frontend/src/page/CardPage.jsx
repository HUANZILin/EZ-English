import { Card, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import Container from "../components/UI/Container";

const StyledDiv = styled.div`
  width: 40%;
  align-self: center;
  margin: 10px 0px 50px 0px;

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-prev:focus,
  .ant-carousel .slick-next:focus {
    font-size: 30px;
    color: #e2e4dd !important;
  }
`;

const StyledCard = styled(Card)`
  background-color: #e2e4dd;
  /* color: #314543; */
  margin: 40px 25px;
  text-align: center;
`;

const CardPage = () => {
  const dummyVoc = [
    {
      title: "Apple",
      translation: "蘋果",
      part: "noun.",
      explanation: "A kind of fruit.",
    },
    {
      title: "Banana",
      translation: "香蕉",
      part: "noun.",
      explanation: "A kind of fruit.",
    },
    {
      title: "Orange",
      translation: "橘子",
      part: "noun.",
      explanation: "A kind of fruit.",
    },
    {
      title: "Pear",
      translation: "梨子",
      part: "noun.",
      explanation: "A kind of fruit.",
    },
  ];

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Container>
      <h1
        style={{
          paddingTop: "100px",
          textAlign: "center",
          letterSpacing: "2rem",
        }}
      >
        &thinsp;單字卡
      </h1>
      <hr width="80%" />
      <StyledDiv>
        <Carousel
          afterChange={onChange}
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {dummyVoc.map((voc) => {
            return (
              <div>
                <StyledCard
                  cover={
                    <img
                      alt="..."
                      src="https://th.bing.com/th/id/OIP.6yHdb5-e5s7VQKjdsBjBNgHaHd?pid=ImgDet&rs=1"
                    />
                  }
                  title={<h2 style={{ color: "#af7a1f" }}>{voc.title}</h2>}
                  bordered={false}
                >
                  <h2>
                    {voc.translation}({voc.part})
                  </h2>
                  <h2>{voc.explanation}</h2>
                </StyledCard>
              </div>
            );
          })}
        </Carousel>
      </StyledDiv>
    </Container>
  );
};

export default CardPage;
