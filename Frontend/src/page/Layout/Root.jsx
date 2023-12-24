import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../../components/UI/MainNav";
import Footer from "../../components/UI/Footer";

const Root = () => {
  const [token, setToken] = useState(sessionStorage.getItem("memberToken"));
  const logoutHandler = (e) => {
    e.preventDefault();

    let logout = confirm("確定要登出嗎？");
    if (logout) {
      sessionStorage.removeItem("memberToken");
      setToken(null);
      location.href = "/login";
    }
  };

  return (
    <>
      <MainNav token={token} onLogout={logoutHandler} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
