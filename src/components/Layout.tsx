import React, { ReactNode } from "react";
import "../public/css/global.css";
import Header from "./Header";
import PcSidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isRoot = location.pathname === "/login";
  const findPage = location.pathname === "/findPin";

  const isMobileOrTablet = useMediaQuery({ maxWidth: 1224 });

  return (
    <div className="container">
      <Header />

      <div className="content_wrapper">
        {!isRoot &&
          !findPage &&
          (isMobileOrTablet ? <MobileSidebar /> : <PcSidebar />)}
        <div className="main_content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
