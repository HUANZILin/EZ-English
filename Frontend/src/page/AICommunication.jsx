import { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Messages from "../components/UI/Chat/Messages";
import InputMessage from "../components/UI/Chat/InputMessage";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 3rem 0rem;
`;

const ChatBlock = styled.div`
  background-color: #e2e4dd;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 1rem 0rem;
  border: 1rem solid #e2e4dd;
  border-radius: 1rem;
  height: 80vh;
  width: 60vw;
  overflow-y: scroll;
`;

const DUMMY_Message = [
  {
    Speaker: "AI bot",
    Message:
      "歡迎進入AI對話-一般對話模式，我是你的學習小助手！Welcome here, I am your AI learning Helper!",
  },
  {
    Speaker: "AI bot",
    Message:
      "請隨意輸入您想跟我聊的內容，我會同時用中英文與你對話喔~Feel free to enter what you want to chat with me, and I will talk to you in both Chinese and English~",
  },
];

const AICommunication = () => {
  const [MessagesData, setMessagesData] = useState(DUMMY_Message);
  const chatBlockRef = useRef(null);

  const addNewText = (enteredText) => {
    setMessagesData((prevData) => {
      return [...prevData, enteredText];
    });
  };

  useEffect(() => {
    chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
  }, [MessagesData]);

  return (
    <Container>
      <ChatBlock ref={chatBlockRef}>
        {MessagesData.map((context, index) => (
          <Messages
            key={index}
            text={context.Message}
            speak={context.Speaker}
          />
        ))}
        {console.log(MessagesData)}
      </ChatBlock>
      <InputMessage newText={addNewText}></InputMessage>
    </Container>
  );
};

export default AICommunication;
