import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const WebsiteLayout = () => {
  return (
    <div className="theme-page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
