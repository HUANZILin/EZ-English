import { Outlet } from "react-router-dom";
import MainNav from "../components/UI/MainNav";
import Footer from "../components/UI/Footer";

const Root = () => {
  return (
    <>
      <MainNav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
