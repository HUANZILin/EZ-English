import { useEffect, useState } from "react";
import { NavLink, redirect } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  display: flex;
  top: 0px;
  background-color: #e2e4dd;
  font-family: 微軟正黑體;
  align-items: center;
  z-index: 5;

  h1 {
    padding: 25px;
    text-align: center;
    background-color: #e2e4dd;
    color: #314543;
  }

  .logo {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-color: #58805e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 30px;
  }

  .logo #logo {
    font-size: 54px;
    color: #e2e4dd;
    font-weight: bold;
  }

  a {
    display: flex;
    width: 100px;
    margin: 0px 10px;
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    color: #314543;
    justify-content: center;
    transition: 0.5s;
  }

  a:hover {
    color: #af7a1f;
  }

  .card_list .list {
    display: none;
    position: absolute;
    top: 50px;
    background-color: #e2e4dd;
  }

  .card_list .list a {
    padding: 20px 0px;
  }

  .card_list .list hr {
    margin: 0px;
  }

  .card_list:hover .list {
    display: block;
  }

  #member {
    position: absolute;
    right: 30px;
  }
`;

const MainNav = (props) => {
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (props.token === null) {
      setIsLogging(false);
    } else {
      setIsLogging(true);
    }
  }, [isLogging]);

  return (
    <Nav>
      <div className="logo">
        <NavLink to={"/"} id="logo">
          EZ
        </NavLink>
      </div>
      <div className="card_list">
        <NavLink to={isLogging ? "vocabulary/list" : "remindlogin"}>
          單字列表
        </NavLink>
        <div className="list">
          <NavLink
            to={isLogging ? "vocabulary/card" : "remindlogin"}
            style={{ marginTop: "20px" }}
          >
            單字卡
          </NavLink>
          <hr />
          <NavLink to={isLogging ? "vocabulary/collection" : "remindlogin"}>
            收藏單字
          </NavLink>
          <hr />
          <NavLink to={isLogging ? "vocabulary/practice" : "remindlogin"}>
            單字練習
          </NavLink>
        </div>
      </div>
      <NavLink to={isLogging ? "video" : "remindlogin"}>影片推薦</NavLink>
      <NavLink to={isLogging ? "aicommunication" : "remindlogin"}>
        AI對話
      </NavLink>
      <div className="card_list">
        <NavLink to={isLogging ? "analysis" : "remindlogin"}>學習分析</NavLink>
        <div className="list">
          <NavLink
            to={isLogging ? "analysis/record" : "remindlogin"}
            style={{ marginTop: "20px" }}
          >
            練習紀錄
          </NavLink>
        </div>
      </div>
      {isLogging ? (
        <>
          <NavLink
            to={isLogging ? "member" : "remindlogin"}
            id="member"
            style={{ right: "140px" }}
          >
            會員資料
          </NavLink>
          <NavLink onClick={props.onLogout} id="member">
            登出
          </NavLink>
        </>
      ) : (
        <NavLink to={"login"} id="member">
          登入
        </NavLink>
      )}
    </Nav>
  );
};

export default MainNav;
