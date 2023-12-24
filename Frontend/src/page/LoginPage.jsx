import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { Link } from "react-router-dom";

import Container from "../components/UI/Container";
import Title from "../components/Title";

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
    margin: 60px 10px 40px 10px;
    height: 2.5rem;
    font-size: 1rem;
    color: #e2e4dd;
    background-color: #314543;
    border: none;
    border-radius: 30px;
    padding: 10px 40px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("account", e.target[0].value);
    formData.append("password", e.target[1].value);

    setMemberData(formData);
  };

  useEffect(() => {
    if (!memberData) return;
    const postData = async () => {
      const response = await fetch("https://jybluega.com/ez-backend/login", {
        method: "POST",
        body: memberData,
      });

      if (!response.ok) {
        alert("帳號或密碼錯誤！");
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setIsLoading(false);
      sessionStorage.setItem("memberToken", data.data);
      alert("登入成功！");
      setIsLogging(true);
    };
    try {
      postData();
    } catch (error) {
      console.log("The error occurred! :", error.message);
    }
  }, [memberData]);

  useEffect(() => {
    if (isLogging) {
      location.href = "/";
    }
  }, [isLogging]);

  return (
    <Container>
      <Title title="會員登入" />
      <StyledForm onSubmit={loginHandler}>
        <label htmlFor="account">帳號/Email</label>
        <input id="email" type="email" name="account" required />
        <label htmlFor="password">密碼</label>
        <input
          id="password"
          type="password"
          name="password"
          minLength="5"
          maxLength="12"
          required
        />

        <button type="submit" disabled={isLoading}>
          登入
        </button>
      </StyledForm>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          marginBottom: "20px",
        }}
      >
        <p style={{ paddingRight: "0.5rem" }}>還沒有帳號嗎？</p>
        <Link
          to="../register"
          style={{
            textDecorationLine: "underline",
            color: "#314543",
            paddingRight: "1rem",
          }}
        >
          註冊
        </Link>
        <p style={{ paddingRight: "0.5rem" }}>忘記密碼？</p>
        <Link
          to="../forgetpassword"
          style={{ textDecorationLine: "underline", color: "#314543" }}
        >
          點擊這裡
        </Link>
      </div>
    </Container>
  );
};

export default LoginPage;
