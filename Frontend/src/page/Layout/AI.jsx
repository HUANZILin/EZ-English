import { useState } from "react";

import { Dropdown, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledDropdown = styled(Dropdown)`
  cursor: pointer;

  /* .ant-dropdown-menu-submenu .ant-dropdown-menu {
    background-color: #e2e4dd !important;
  } */

  /* li.ant-dropdown-menu-item-selected {
    background-color: #efc06f;
    color: #af7a1f;
  }

  .ant-dropdown-menu-item,
  .ant-dropdown-menu-item-selected,
  .ant-dropdown-menu-item-only-child {
    background-color: #58805e;
  }

  .ant-dropdown-menu-title-content {
    background-color: #58805e;
  }  */
`;

const AI = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [model, setModel] = useState("一般對話");

  const items = [
    {
      key: "一般對話",
      label: (
        <Link to={"./"} style={{ fontSize: "16px", color: "#314543" }}>
          一般對話模式
        </Link>
      ),
    },
    {
      key: "文法糾錯",
      label: (
        <Link to={"grammar"} style={{ fontSize: "16px", color: "#314543" }}>
          文法糾錯模式
        </Link>
      ),
    },
  ];

  const onClick = ({ key }) => {
    messageApi.open({
      type: "success",
      content: `切換至 ${key}模式`,
    });
    setModel(key);
  };

  return (
    <div style={{ paddingTop: "3rem" }}>
      {contextHolder}
      <h1
        style={{
          paddingTop: "100px",
          textAlign: "center",
          letterSpacing: "1rem",
        }}
      >
        {`AI對話-${model}模式`}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingRight: "10%",
        }}
      >
        <StyledDropdown
          menu={{
            items,
            onClick,
            selectable: true,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()} style={{ fontSize: "20px" }}>
            <Space>
              選擇練習模式
              <DownOutlined />
            </Space>
          </a>
        </StyledDropdown>
      </div>
      <hr width="80%" />
      <Outlet />
    </div>
  );
};

export default AI;
