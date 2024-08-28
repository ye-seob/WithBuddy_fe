import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/user";
import styles from "../public/css/MobileSidebar.module.css";
import { useState } from "react";

const MobileSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response === 200) {
        localStorage.clear();
        setIsSidebarOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {!isSidebarOpen && (
        <div
          className={styles.hamburger}
          onClick={toggleSidebar}
          aria-label="메뉴 열기/닫기"
        >
          <FaBars color="#a9bd7d" size={25} />
        </div>
      )}

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}

      <div
        className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}
      >
        <div className={styles.sidebarContent}>
          <Link to="/match" onClick={closeSidebar}>
            <div className={styles.icon}>홈</div>
          </Link>
          <Link to="/ranking" onClick={closeSidebar}>
            <div className={styles.icon}>랭킹</div>
          </Link>
          <Link to="/chat" onClick={closeSidebar}>
            <div className={styles.icon}>채팅</div>
          </Link>
          <Link to="/edit" onClick={closeSidebar}>
            <div className={styles.icon}>정보 수정</div>
          </Link>
          <Link to="/setting" onClick={closeSidebar}>
            <div className={styles.icon}>설정</div>
          </Link>
          <div className={styles.icon} onClick={handleLogout}>
            로그아웃
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
