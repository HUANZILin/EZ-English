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
    font-size: 16px;
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

const MainNav = () => {
  return (
    <Nav>
      <div className="logo">
        <a href="#" id="logo">
          LOGO
        </a>
      </div>
      <div className="card_list">
        <a href="#" id="card">
          單字列表
        </a>
        <div className="list">
          <a href="#" style={{ marginTop: "20px" }}>
            單字卡
          </a>
          <hr style={{ color: "#58805e" }} />
          <a href="#">收藏單字</a>
          <hr style={{ color: "#58805e" }} />
          <a href="#">單字練習</a>
        </div>
      </div>
      <a href="#">影片推薦</a>
      <a href="#">AI對話</a>
      <a href="#">學習分析</a>
      <a href="#" id="member" style={{ right: "140px" }}>
        會員資料
      </a>
      <a href="#" id="member">
        登出
      </a>
    </Nav>
  );
};

export default MainNav;
