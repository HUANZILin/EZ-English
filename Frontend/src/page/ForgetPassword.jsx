import styled from "styled-components";

import Container from "../components/UI/Container";
import Title from "../components/Title";
import { useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;

  label {
    font-size: 1.5rem;
    padding: 10px;
    margin-top: 10px;
  }

  input {
    height: 2.5rem;
    width: 20vw;
    text-align: center;
    line-height: 2.5rem;
    color: #314543;
    background-color: #e2e4dd;
    border: 0px;
    border-radius: 2rem;
    float: right;
    outline: none;
  }

  input::placeholder {
    color: #314543;
    opacity: 0.6;
  }

  button {
    margin: 60px 10px 100px 10px;
    height: 2.5rem;
    font-size: 1rem;
    color: #e2e4dd;
    background-color: #314543;
    border: none;
    border-radius: 30px;
    padding: 10px 40px;
  }
`;

const ForgetPassword = () => {
  const [inputValue, setInputValue] = useState("");
  const [sendMail, setSendMail] = useState(false);

  if (sendMail) {
    return (
      <Container>
        <Title title="取得密碼" />
        <StyledForm action="">
          <label htmlFor="account">驗證碼</label>
          <input
            type="email"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="請輸入您信箱收到的驗證碼"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              alert("臨時密碼已發送至您的信箱。");
              location.href = "/login";
            }}
          >
            寄送驗證信
          </button>
        </StyledForm>
      </Container>
    );
  }

  return (
    <Container>
      <Title title="忘記密碼" />
      <StyledForm action="">
        <label htmlFor="account">帳號/Email</label>
        <input
          type="email"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="請輸入您的帳號(email)"
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setInputValue("");
            alert("驗證碼已發送至您的信箱。");
            setSendMail(true);
          }}
        >
          寄送驗證信
        </button>
      </StyledForm>
    </Container>
  );
};

export default ForgetPassword;
