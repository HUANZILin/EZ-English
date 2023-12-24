import { useState } from "react";
import axios from "axios";
const apiKey = import.meta.env.VITE_CHATGPT_API_KEY;

import { EnterOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 2rem;
`;

const TheInput = styled.input`
  width: 55vw;
  height: 4rem;
  border-radius: 30px;
  background-color: #e2e4dd;
  color: #314543;
  font-size: 1.5rem;
  font-weight: bold;
  text-indent: 10px;
  border: none;
  padding-left: 10px;
`;

const Button = styled.button`
  width: 4rem;
  height: 4rem;
  margin-left: 1rem;
  padding: 0;
`;

const StyledEnterOutlined = styled(EnterOutlined)`
  color: #314543;

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const InputMessageGrammar = (props) => {
  const [nowTexting, setNowTexting] = useState("");

  const appendMessage = (sender, content) => {
    props.newText({ Speaker: sender, Message: content });
  };

  let botReply;

  const submitHandler = async () => {
    if (nowTexting.trim() === "") return;

    appendMessage("User", nowTexting);
    setNowTexting("");

    try {
      const response = await axios
        .post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You will be provided with some statements, and your task is to correct them to standard English and repeat, also translate it into Traditional Chinese. ",
              },
              {
                role: "user",
                content: nowTexting,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: apiKey,
            },
          }
        )
        .then(function (response) {
          botReply = response.data.choices[0].message.content;
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error("Error calling ChatGPT API:", error);
    }

    appendMessage("AI bot", botReply);
  };

  return (
    <Container>
      <TheInput
        type="text"
        placeholder="請輸入訊息"
        value={nowTexting}
        onChange={(e) => setNowTexting(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler();
          }
        }}
      />
      <Button type="button" onClick={submitHandler}>
        <StyledEnterOutlined />
      </Button>
    </Container>
  );
};

export default InputMessageGrammar;
