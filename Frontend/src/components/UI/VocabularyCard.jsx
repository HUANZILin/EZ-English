import styled from "styled-components";
import { Progress } from "antd";
import OffCollection from "./Collection/OffCollect.png";
import InCollection from "./Collection/InCollect.png";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 3fr 8fr 3fr;
  align-items: center;
  justify-items: center;
  background-color: #e2e4dd;
  border-radius: 1rem;
  color: #314543;
  padding: 0.5rem 1rem;
  margin: 1rem;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 1rem;
  padding: 0;
`;

const BarDiv = styled.div`
  display: flex;
  width: 20rem;
  justify-content: center;
`;

const VocabularyCard = (props) => {
  const url = "https://jybluega.com/ez-backend/collection";
  const token = sessionStorage.getItem("memberToken");

  const [isCollected, setIsCollected] = useState(props.collected);

  useEffect(() => {
    if (typeof isCollected == "string") {
      const booleanValue = isCollected.toLowerCase() === "true";
      setIsCollected(booleanValue);
    }
  }, [isCollected]);

  const handlePostRequest = async () => {
    const formData = new FormData();
    formData.set("w_id", props.theID);
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("POST request successful:", data);
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const c_id = await getWordData();
      const response = await fetch(
        `https://jybluega.com/ez-backend/collection/${c_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("DELETE request successful:", data);
    } catch (error) {
      console.error("Error during DELETE request:", error);
    }
  };

  const getWordData = async () => {
    const url = `https://jybluega.com/ez-backend/wordList/${props.theID}`;
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resData = await response.json();
      return resData.data.wordData[0].c_id;
    } catch (error) {
      console.log("The error occurred! :", error.message);
      return null;
    }
  };

  const clickHandler = async (event) => {
    event.preventDefault();
    if (isCollected) {
      setIsCollected(false);
      await handleDeleteRequest();
    } else {
      setIsCollected(true);
      await handlePostRequest();
    }
  };

  return (
    <Container>
      <Button onClick={clickHandler}>
        <img
          src={isCollected ? InCollection : OffCollection}
          style={{ width: "30px", height: "30px" }}
          alt="Collection Status"
        />
      </Button>
      <h2 style={{ color: "#af7a1f" }}>{props.word}</h2>
      <h2>({props.pos})</h2>
      <BarDiv>
        <Progress
          strokeColor="#58805e"
          percent={props.corr * 33.3}
          trailColor="#314543"
          size={[250, 20]}
          showInfo={false}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        ></Progress>
        <h2 style={{ fontSize: "1.3em" }}>
          {props.corr == null ? "0" : `${props.corr * 33}`.slice(0, 4)}%
        </h2>
      </BarDiv>
      <h2 style={{ fontSize: "1.3em" }}>
        {props.lp == null ? "未有測驗紀錄" : props.lp.slice(0, 10)}
      </h2>
    </Container>
  );
};

export default VocabularyCard;
