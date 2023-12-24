import { useEffect, useState } from "react";

import { Card, Carousel, Alert } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import Container from "../components/UI/Container";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorBlock from "../components/UI/ErrorBlock";
import Title from "../components/Title";

const StyledDiv = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 2rem 0px 50px 0px;

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-prev:focus,
  .ant-carousel .slick-next:focus {
    font-size: 36px;
    color: #e2e4dd !important;
  }
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #e2e4dd;
  margin: 40px 25px;
  padding-bottom: 24px;

  .ant-card-head-title {
    white-space: normal;
  }

  h2 {
    color: #314543;
    font-size: x-large;
    padding: 10px 0px;
  }
`;

const VideoPage = () => {
  const token = sessionStorage.getItem("memberToken");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://jybluega.com/ez-backend/video", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setVideoData(data.data.videos.items);
      console.log(data.data.videos.items);
    }

    try {
      fetchData();
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.log("The error occurred! :", error.message);
    }
  }, []);

  if (isLoading) {
    return (
      <Container>
        <Title title="影片推薦" />
        <h2
          style={{ fontSize: "28px", alignSelf: "center", marginTop: "2rem" }}
        >
          Loading...
        </h2>
        <LoadingIndicator />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Title title="影片推薦" />
        <ErrorBlock
          title={"發生錯誤"}
          message={"取得資料時發生錯誤，請確認網路連線或於片刻後重整頁面。"}
          style={{ width: "65%" }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Title title="影片推薦" />
      <StyledDiv>
        <Alert
          message={
            <h3 style={{ color: "#314543", margin: "0", paddingLeft: "12px" }}>
              關於推薦機制
            </h3>
          }
          description={
            <p
              style={{
                color: "#314543",
                margin: "0",
                paddingLeft: "12px",
                fontSize: "1rem",
              }}
            >
              <ul>
                <li>
                  根據使用者最新的<strong>AI對話(一般模式)紀錄</strong>
                  進行關鍵字擷取，並推薦最相關的TED演講影片，希望讓使用者透過感興趣的話題快樂學英文:)
                </li>
                <li>如果還未進行過對話，則隨機推薦</li>
              </ul>
            </p>
          }
          type="success"
          icon={<InfoCircleOutlined />}
          showIcon
          closeIcon
        />
        <Carousel
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {videoData.map((video) => {
            return (
              <div key={video.id.videoId}>
                <StyledCard
                  title={<h2>{video.snippet.title}</h2>}
                  bordered={false}
                >
                  <iframe
                    width="620"
                    height="360"
                    src={`https://www.youtube.com/embed/${video.id.videoId}?`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </StyledCard>
              </div>
            );
          })}
        </Carousel>
      </StyledDiv>
    </Container>
  );
};

export default VideoPage;
