import { useEffect, useContext, useState } from "react";
import { RecordData } from "../store/RecordDataContext";

import styled from "styled-components";
import Container from "../components/UI/Container";
import Title from "../components/Title";
import Record from "../components/UI/Record";

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 60%;
  padding: 0% 20%;
`;

const Smalltit = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 60%;
  padding: 0% 20%;
`;

const PracticeRecordPage = () => {
  const DUMMY_Record = {
    [2023 - 12 - 19]: [{ w_word: "Apple", p_select: "隨機", p_score: "1" }],
  };

  const recordCtx = useContext(RecordData);
  const [recordData, setRecordData] = useState(DUMMY_Record);

  useEffect(() => {
    setRecordData(recordCtx);
  }, [recordCtx]);

  return (
    <Container>
      <Title title={"練習紀錄"} />
      {recordData[1992] ? (
        <Container>
          <h2 style={{ alignSelf: "center", color: "#e2e4dd" }}>無練習紀錄</h2>
        </Container>
      ) : (
        <>
          <Smalltit>
            <h2 style={{ paddingLeft: "2.5rem" }}>測驗時間</h2>
            <h2 style={{ paddingRight: "6rem" }}>測驗類型</h2>
            <h2 style={{ paddingRight: "10rem" }}>正確率</h2>
          </Smalltit>
          <Card>
            {Object.keys(recordData).map((key) => (
              <Record key={key} time={key} data={recordData[key]} />
            ))}
          </Card>
        </>
      )}
    </Container>
  );
};

export default PracticeRecordPage;
