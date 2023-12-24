import styled from "styled-components";
import { Link } from "react-router-dom";

import { Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import Container from "../components/UI/Container";
import Title from "../components/Title";

const RemindLoginPage = () => {
  return (
    <Container>
      <Title title="請先登入" />
      <Alert
        style={{
          display: "flex",
          alignSelf: "center",
          width: "40%",
          margin: "3rem",
        }}
        message={
          <h3 style={{ color: "#314543", margin: "0", paddingLeft: "12px" }}>
            本頁面需要會員權限才能瀏覽
          </h3>
        }
        description={
          <p
            style={{
              color: "#314543",
              margin: "0",
              paddingLeft: "12px",
              fontSize: "1rem",
            }}
          >
            點擊
            <Link
              to="../login"
              style={{ textDecorationLine: "underline", color: "#af7a1f" }}
            >
              這裡
            </Link>
            進行登入。
          </p>
        }
        type="success"
        icon={<InfoCircleOutlined />}
        showIcon
        closeIcon
      />
    </Container>
  );
};

export default RemindLoginPage;
