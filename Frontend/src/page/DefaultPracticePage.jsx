import { Card, Carousel, Segmented, Collapse, Alert } from "antd";
import {
  CaretDownFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Container from "../components/UI/Container";
import CollectButton from "../components/UI/Collection/CollectButton";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";

const StyledDiv = styled.div`
  width: 40%;
  align-self: center;
  margin-bottom: 50px;

  .ant-carousel .slick-next,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-next:focus,
  .ant-carousel .slick-prev,
  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-prev:focus {
    font-size: 36px;
    color: #e2e4dd !important;
  }
`;

const StyledCard = styled(Card)`
  background-color: #e2e4dd;
  margin: 40px 25px;
  padding-bottom: 24px;
  text-align: center;

  h2 {
    color: #314543;
  }
`;

const StyledSegmented = styled(Segmented)`
  background-color: #e2e4dd;
  font-size: medium;

  .ant-segmented-item {
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e2e4dd;
    background-color: #314543;
    margin: 0rem 0.2rem;
  }

  .ant-segmented-item-selected {
    color: #e2e4dd;
    background-color: #58805e;
  }
`;

const StyledButton = styled.button`
  width: 35%;
  color: #e2e4dd;
  font-weight: bold;
  background-color: #314543;
  display: flex;
  align-self: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const DefaultPracticePage = () => {
  const token = sessionStorage.getItem("memberToken");
  const [testWord, setTestWord] = useState();
  const [userAnswers, setUserAnswers] = useState([]);

  const getWordData = async () => {
    const url = "https://jybluega.com/ez-backend/quizrandom";
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resData = await response.json();
      setTestWord(resData.data.wordsData);
      const initialAnswers = resData.data.wordsData.map((word) => ({
        id: word.w_id,
        score: 1,
        select: "隨機",
      }));
      setUserAnswers(initialAnswers);
    } catch (error) {
      console.log("The error occurred! :", error.message);
      return null;
    }
  };

  useEffect(() => {
    getWordData();
  }, []);

  if (!testWord) {
    return (
      <Container>
        <>
          <h2
            style={{ fontSize: "28px", alignSelf: "center", marginTop: "2rem" }}
          >
            Loading...
          </h2>
          <LoadingIndicator />
        </>
      </Container>
    );
  }

  const handleAnswerChange = (wordId, score) => {
    // 找到使用者答案陣列中單詞的索引
    const index = userAnswers.findIndex((answer) => answer.id === wordId);
    if (score == "陌生") {
      score = 1;
    } else if (score == "不確定") {
      score = 2;
    } else {
      score = 3;
    }

    if (index !== -1) {
      // 如果單詞已經存在於陣列中，則更新程度
      setUserAnswers((prevAnswers) => [
        ...prevAnswers.slice(0, index),
        { id: wordId, score, select: "隨機" },
        ...prevAnswers.slice(index + 1),
      ]);
    }
  };
  console.log(userAnswers);

  const submitHandler = async () => {
    const formData = new FormData();
    try {
      userAnswers.forEach(async (item, index) => {
        formData.append("w_id", item.id);
        formData.append("score", item.score);
        formData.append("select", item.select);

        const response = await fetch(
          "https://jybluega.com/ez-backend/quizData",
          {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("POST request successful:", data);
        formData.delete("w_id");
        formData.delete("score");
        formData.delete("select");
      });
      refreshPage();
    } catch (error) {
      console.log("The error occurred! :", error.message);
    }
  };

  const refreshPage = () => {
    window.alert("測驗已提交，即將跳轉到首頁");
    setTimeout(() => {
      location.href = "/";
    }, 500);
  };

  return (
    <Container>
      <StyledDiv>
        <Carousel
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {testWord.map((voc) => {
            return (
              <div key={voc.w_id}>
                <StyledCard
                  title={
                    <h2 style={{ color: "#af7a1f", fontSize: "xx-large" }}>
                      {voc.w_word}
                    </h2>
                  }
                  bordered={false}
                >
                  <Collapse
                    items={[
                      {
                        key: voc.w_id,
                        label: (
                          <div style={{ paddingBottom: "17px" }}>
                            <h2 style={{ marginBottom: "-5px" }}>查看解釋</h2>
                            <CaretDownFilled style={{ color: "#314543" }} />
                          </div>
                        ),
                        children: (
                          <>
                            <h2>
                              {voc.w_chinese}({voc.w_part_of_speech})
                            </h2>
                            <p>{voc.w_meaning}</p>
                          </>
                        ),
                        showArrow: false,
                      },
                    ]}
                    bordered={false}
                  />
                  <hr style={{ backgroundColor: "#314543", margin: "32px" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 32px",
                    }}
                  >
                    <CollectButton initState={false} wordID={voc.w_id} />
                    <StyledSegmented
                      block
                      options={["陌生", "不確定", "熟悉"]}
                      onChange={(e) => handleAnswerChange(voc.w_id, e)}
                    />
                  </div>
                </StyledCard>
              </div>
            );
          })}
        </Carousel>
      </StyledDiv>
      <StyledButton onClick={submitHandler}>完成作答，送出</StyledButton>
    </Container>
  );
};

export default DefaultPracticePage;
