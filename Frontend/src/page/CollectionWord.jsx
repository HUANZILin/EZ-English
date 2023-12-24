import styled from "styled-components";
import Title from "../components/Title";
import VocabularyCard from "../components/UI/VocabularyCard";
import { useState, useEffect } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 3rem 0rem;
`;

const Smalltit = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 60rem;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60rem;
`;

const CollectionWord = () => {
  const token = sessionStorage.getItem("memberToken");
  const [theCollectedList, setTheCollectedList] = useState([]);
  const [nowLoading, setNowLoading] = useState(true);

  useEffect(() => {
    const url = "https://jybluega.com/ez-backend/collection";
    async function fetchData() {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await response.json();
      setTheCollectedList(resData.data.wordsData);
      setNowLoading(false);
    }
    try {
      fetchData();
    } catch (error) {
      console.log("The error occuered! :", error.message);
    }
  }, []);

  if (nowLoading) {
    return (
      <Container>
        <Title title="收藏單字" />
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
      <Title title="收藏單字" />
      {theCollectedList.length == 0 ? (
        ""
      ) : (
        <Smalltit>
          <h2 style={{ paddingLeft: "10rem" }}>單字(詞性)</h2>
          <h2 style={{ paddingLeft: "6rem" }}>正確率</h2>
          <h2 style={{ paddingRight: "2rem" }}>最後測驗時間</h2>
        </Smalltit>
      )}
      <Card>
        {theCollectedList.length == 0 ? (
          <Container>
            <h2 style={{ alignSelf: "center", color: "#e2e4dd" }}>
              Oops！你沒有收藏的單字
            </h2>
          </Container>
        ) : (
          theCollectedList.map((word) => (
            <VocabularyCard
              nowIsCollected={word.collect}
              key={word.w_id}
              word={word.w_word}
              pos={word.w_part_of_speech}
              lp={word.latest_datetime}
              corr={word.average_score}
              collected={word.collect}
              theID={word.w_id}
            />
          ))
        )}
      </Card>
    </Container>
  );
};

export default CollectionWord;
