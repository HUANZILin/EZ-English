import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styled from "styled-components";

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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("account", e.target[0].value);
    formData.append("password", e.target[1].value);
    formData.append("repassword", e.target[2].value);

    setUserData(formData);
  };

  useEffect(() => {
    const postData = async () => {
      const response = await fetch("https://jybluega.com/ez-backend/register", {
        method: "POST",
        body: userData,
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.status === 403) {
          alert(data.messages.error);
        }
        throw new Error("Something went wrong!");
      }

      console.log("POST request successful:", data);
      setIsLoading(false);
      alert("註冊成功！將導向登入頁。");
      navigate("/login");
    };
    try {
      postData();
    } catch (error) {
      console.log("The error occurred! :", error.message);
    }
  }, [userData]);

  return (
    <Container>
      <Title title="會員註冊" />
      <StyledForm onSubmit={registerHandler}>
        <label htmlFor="account">帳號/Email</label>
        <input
          id="account"
          name="account"
          type="email"
          placeholder="請輸入帳號(email)"
          required
        />
        <label htmlFor="password">密碼</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength="5"
          maxLength="12"
          placeholder="請輸入密碼"
          required
        />
        <label htmlFor="repassword">確認密碼</label>
        <input
          id="repassword"
          name="repassword"
          type="password"
          minLength="5"
          maxLength="12"
          placeholder="請再次輸入密碼"
          required
        />
        <button type="submit" disabled={isLoading}>
          註冊
        </button>
      </StyledForm>
    </Container>
  );
};

export default RegisterPage;
