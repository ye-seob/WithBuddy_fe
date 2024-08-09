import { CiHome, CiEdit, CiBoxList, CiLogin, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import styles from "../public/css/Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/match">
        <div className={styles.icon}>
          <CiHome />
        </div>
      </Link>
      <Link to="/ranking">
        <div className={styles.icon}>
          <CiBoxList />
        </div>
      </Link>
      <Link to="/edit">
        <div className={styles.icon}>
          <CiEdit />
        </div>
      </Link>
      <Link to="/setting">
        <div className={styles.icon}>
          <CiSettings />
        </div>
      </Link>
      <div className={styles.logoutIcon}>
        <CiLogin />
      </div>
    </div>
  );
};

export default Sidebar;
