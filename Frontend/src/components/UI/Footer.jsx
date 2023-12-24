import styled from "styled-components";

import { UpOutlined } from "@ant-design/icons";

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  background-color: #e2e4dd;
  position: relative;

  .logo {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    background-color: #58805e;
    color: #e2e4dd;
    font-size: 90px;
    font-weight: bold;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    margin: 0px 50px;
  }

  .block {
    margin: 30px 30px;
    color: #314543;
  }

  .block h2 {
    font-size: 24px;
    font-weight: bold;
  }

  .block ul {
    display: flex;
    flex-direction: column;
  }

  .block ul li {
    display: flex;
    list-style: none;
    font-size: 20px;
    margin-left: -30px;
    line-height: 2.5rem;
  }

  .block ul li a {
    text-decoration: none;
    font-weight: 500;
    color: #314543;
    transition: 0.5s;
  }

  .block ul li a:hover {
    color: #af7a1f;
  }

  p {
    position: absolute;
    bottom: 24px;
    right: 200px;
    color: #314543;
    font-size: 18px;
  }

  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    right: 50px;
    bottom: 50px;
    color: #e2e4dd;
    background-color: #58805e;
    border: none;
    border-radius: 100%;
    cursor: pointer;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="logo">
        <h3>EZ</h3>
      </div>
      <div className="block">
        <h2>聯絡我們</h2>
        <ul>
          <li>
            <a href="#">關於 About</a>
          </li>
          <li>
            <a href="#">聯絡 Contact Us</a>
          </li>
          <li>
            <a href="#">職涯 Careers</a>
          </li>
        </ul>
      </div>
      <div className="block">
        <h2>常見問題</h2>
        <ul>
          <li>
            <a href="#">問題中心 QA</a>
          </li>
          <li>
            <a href="#">回報 Report</a>
          </li>
        </ul>
      </div>
      <div className="block">
        <h2>使用教學</h2>
        <ul>
          <li>
            <a href="#">基本操作 Basic</a>
          </li>
          <li>
            <a href="#">社群 Community</a>
          </li>
        </ul>
      </div>
      <p>@2023 copyright</p>
      <button>
        <UpOutlined style={{ fontSize: "3.5rem" }} />
      </button>
    </StyledFooter>
  );
};

export default Footer;
