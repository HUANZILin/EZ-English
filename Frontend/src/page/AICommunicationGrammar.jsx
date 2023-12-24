import { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import Messages from "../components/UI/Chat/Messages";
import InputMessageGrammar from "../components/UI/Chat/InputMessageGrammar";

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
      "歡迎進入AI對話-文法糾錯模式，我是你的學習小助手！Welcome here, I am your AI learning Helper!",
  },
  {
    Speaker: "AI bot",
    Message:
      "請隨意輸入您想校對的語句，我會及時糾正您的文法並回覆！Feel free to enter what you want to talk to me about, and I will correct your grammar and reply in time!",
  },
];

const AICommunicationGrammar = () => {
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
      <InputMessageGrammar newText={addNewText}></InputMessageGrammar>
    </Container>
  );
};

export default AICommunicationGrammar;
