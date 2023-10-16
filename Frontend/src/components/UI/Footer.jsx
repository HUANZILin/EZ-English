import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #e2e4dd;
  position: relative;

  .logo {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    background-color: #58805e;
    color: #e2e4dd;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
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
    line-height: 30px;
  }

  .block ul li a {
    text-decoration: none;
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
    width: 50px;
    height: 50px;
    right: 50px;
    bottom: 50px;
    background-color: #58805e;
    border: none;
    border-radius: 100%;
    cursor: pointer;
  }

  button .icon {
    position: relative;
    width: 50px;
    height: 50px;
  }

  button .icon svg {
    position: absolute;
    top: 10px;
    left: 16px;
    transform: translate(-50%);
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="logo">
        <h3>LOGO</h3>
      </div>
      <div className="block">
        <h2>聯絡我們</h2>
        <ul>
          <li>
            <a href="#">Blabla</a>
          </li>
          <li>
            <a href="#">Blabla</a>
          </li>
          <li>
            <a href="#">Blabla</a>
          </li>
        </ul>
      </div>
      <div className="block">
        <h2>常見問題</h2>
        <ul>
          <li>
            <a href="#">Blabla</a>
          </li>
          <li>
            <a href="#">Blabla</a>
          </li>
          <li>
            <a href="#">Blabla</a>
          </li>
        </ul>
      </div>
      <div className="block">
        <h2>使用教學</h2>
        <ul>
          <li>
            <a href="#">Blabla</a>
          </li>
          <li>
            <a href="#">Blabla</a>
          </li>
          <li>
            <a href="#">Blabla</a>
          </li>
        </ul>
      </div>
      <p>@2023 copyright</p>
      <button>
        <div className="icon">
          <svg height="50" width="50">
            <line
              x1="-10"
              y1="25"
              x2="16"
              y2="4"
              style={{ stroke: "#e2e4dd", strokeWidth: "5" }}
            />
          </svg>
          <svg height="50" width="50">
            <line
              x1="40"
              y1="25"
              x2="14"
              y2="4"
              style={{ stroke: "#e2e4dd", strokeWidth: "5" }}
            />
          </svg>
        </div>
      </button>
    </StyledFooter>
  );
};

export default Footer;
