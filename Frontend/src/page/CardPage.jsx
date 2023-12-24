import { useEffect, useState, useContext } from "react";

import { Card, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { WordData } from "../store/WordDataContext";

import Container from "../components/UI/Container";
import Title from "../components/Title";
import Modal from "../components/UI/Modal";
import { NewCardModal } from "../components/UI/NewCardModal";
import CollectButton from "../components/UI/Collection/CollectButton";
import LoadingIndicator from "../components/UI/LoadingIndicator";

const StyledButton = styled.button`
  background-color: #e2e4dd;
  color: #314543;
  font-size: large;
  font-weight: bold;
  letter-spacing: 2px;
  width: fit-content;
`;

const GeneralButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #e2e4dd;
  background-color: #314543;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  margin-right: 10px;
`;

const AlertButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #e2e4dd;
  background-color: #6d2134;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
`;

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

  button {
    font-size: medium;
  }
`;

const CardPage = () => {
  const wordCtx = useContext(WordData);
  //   const getCollectionData = async () => {
  //     const url = `https://jybluega.com/ez-backend/collection`;
  //     const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtX2lkIjoiNCIsIm1fYWNjb3VudCI6InRlc3QifQ.1TMkD1UIvZDPAdv64e8wLYp4F7rkBYgrYre9yQ8s33A';
  //     try {
  //       const response = await fetch(url, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const resData = await response.json();
  //       return resData.data.wordsData;
  //     } catch (error) {
  //       console.log("The error occurred! :", error.message);
  //       return null;
  //     }

  // };

  const getRandomObjects = (list, count) => {
    const copiedList = list.slice();
    const randomObjects = [];

    for (let i = 0; i < count && copiedList.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * copiedList.length);
      const selectedObject = copiedList.splice(randomIndex, 1)[0];
      randomObjects.push(selectedObject);
    }

    return randomObjects;
  };

  const [cardVoc, setCardVoc] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteVoc, setDeleteVoc] = useState();
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    async function renderCard() {
      if (wordCtx) {
        const selectedCard = getRandomObjects(wordCtx, 4);
        setCardVoc(selectedCard);
        console.log(selectedCard);
      }
    }
    renderCard();
  }, [wordCtx]);

  const createHandler = (e) => {
    e.preventDefault();
    setIsCreate(true);
  };

  const newCardHandler = (item) => {
    setCardVoc([...cardVoc, item]);
  };

  const handleStartDelete = () => {
    const newDummyVoc = cardVoc.filter((element) => element.w_id !== deleteVoc);
    setCardVoc(newDummyVoc);
    setIsDelete(false);
  };

  const handleStopDelete = () => {
    setIsDelete(false);
  };

  if (!cardVoc) {
    return (
      <Container>
        <Title title="單字卡" />
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
      <div
        style={{ display: "flex", justifyContent: "end", paddingRight: "10%" }}
      >
        <StyledButton onClick={createHandler}>新增單字卡</StyledButton>
      </div>
      <hr width="80%" />
      <StyledDiv>
        <Carousel
          arrows
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {cardVoc.map((voc) => {
            return (
              <div key={voc.w_id}>
                <StyledCard
                  title={
                    <h2
                      style={{
                        color: "#af7a1f",
                        fontSize: "xx-large",
                        padding: "10px 0px",
                      }}
                    >
                      {voc.w_word}
                    </h2>
                  }
                  bordered={false}
                >
                  <h2>
                    {voc.w_chinese}({voc.w_part_of_speech})
                  </h2>
                  <h2>{voc.w_meaning}</h2>
                  <hr style={{ backgroundColor: "#314543", margin: "32px" }} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 32px",
                    }}
                  >
                    <CollectButton initState={false} wordID={voc.w_id} />
                    <button
                      style={{ backgroundColor: "#6D2134", color: "#e2e4dd" }}
                      onClick={() => {
                        setIsDelete(true);
                        setDeleteVoc(voc.w_id);
                      }}
                    >
                      刪除卡片
                    </button>
                  </div>
                </StyledCard>
              </div>
            );
          })}
        </Carousel>
      </StyledDiv>
      {isCreate && (
        <NewCardModal
          handleStopCreate={() => {
            setIsCreate(false);
          }}
          handleCreateCard={newCardHandler}
        />
      )}
      {isDelete && (
        <Modal>
          <h2>確定要刪除嗎?</h2>
          <p>確定要刪除此單字卡?此動作無法回復</p>
          <div>
            <GeneralButton onClick={handleStopDelete}>取消</GeneralButton>
            <AlertButton onClick={handleStartDelete}>刪除</AlertButton>
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default CardPage;
