import { useState } from "react";
import { message } from "antd";
import styled from "styled-components";
import OffCollection from "../Collection/OffCollect.png";
import InCollection from "../Collection/InCollect.png";

const Button = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
`;

const CollectButton = (props) => {
  const url = "https://jybluega.com/ez-backend/collection";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtX2lkIjoiNCIsIm1fYWNjb3VudCI6InRlc3QifQ.1TMkD1UIvZDPAdv64e8wLYp4F7rkBYgrYre9yQ8s33A";
  const [isCollected, setIsCollected] = useState(props.initState);
  const [messageApi, contextHolder] = message.useMessage();

  const clickHandler = async(event) => {
    event.preventDefault();
    if (isCollected) {
      setIsCollected(false);
      await handleDeleteRequest();
      messageApi.open({ type: "warning", content: "已取消收藏" });
    } else {
      setIsCollected(true);
      await handlePostRequest();
      messageApi.open({ type: "success", content: "已加入收藏" });
    }
  };

  const handlePostRequest = async () => {
    const formData = new FormData();
    formData.set("w_id", props.wordID);
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
    const url = `https://jybluega.com/ez-backend/wordList/${props.wordID}`;
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

  return (
    <>
      {contextHolder}
      <Button onClick={clickHandler}>
        <img
          src={`${isCollected ? InCollection : OffCollection}`}
          style={{ width: "30px", height: "30px" }}
        />
      </Button>
    </>
  );
};

export default CollectButton;
