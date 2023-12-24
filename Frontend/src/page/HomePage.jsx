import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHomePic = styled.div`
  background-image: url("src/assets/首頁大圖.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 500px;
`;

const StyledSection = styled(Link)`
  display: inline-block;
  width: 100%;
  font-size: 36px;
  font-weight: 500;
  letter-spacing: 10px;
  text-align: center;
  padding: 60px 0px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => (props.color ? props.color : "#e2e4dd")};

  p {
    font-size: 24px;
    letter-spacing: 5px;
    margin: -5px;
    font-weight: 400;
  }

  &:hover {
    color: #7b8072;
  }
`;

const HomePage = () => {
  const token = sessionStorage.getItem("memberToken");
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (token === null) {
      setIsLogging(false);
    } else {
      setIsLogging(true);
    }
  }, [isLogging]);

  return (
    <>
      <Row>
        <StyledHomePic />
      </Row>
      <Row>
        <Col span={14}>
          <StyledSection
            to={isLogging ? "vocabulary/card" : "remindlogin"}
            backgroundColor={"#e2e4dd"}
            color={"#314543"}
          >
            單字卡
            <br />
            <p>Vocabulary Card</p>
          </StyledSection>
        </Col>
        <Col span={10}>
          <StyledSection
            to={isLogging ? "video" : "remindlogin"}
            backgroundColor={"#af7a1f"}
          >
            影片推薦
            <br />
            <p>Recommended Videos</p>
          </StyledSection>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <StyledSection
            to={isLogging ? "aicommunication" : "remindlogin"}
            backgroundColor={"#314543"}
          >
            AI對話
            <br />
            <p>AI Conversation</p>
          </StyledSection>
        </Col>
        <Col span={14}>
          <StyledSection
            to={isLogging ? "analysis" : "remindlogin"}
            backgroundColor={"#58805e"}
          >
            學習分析
            <br />
            <p>Learning-Data Analysis</p>
          </StyledSection>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
