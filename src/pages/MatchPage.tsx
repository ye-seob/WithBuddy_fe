import "../public/css/global.css";
import { useState } from "react";
import GroupMatching from "../components/GroupMatching";
import styles from "../public/css/MatchPage.module.css";
import PersonalMatch from "../components/PersonalMatch";

const MatchPage = () => {
  const [tab, setTab] = useState("group");

  const handleTabClick = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.tab_container}>
        <div
          onClick={() => handleTabClick("group")}
          className={`${styles.tab_item} ${
            tab === "group" ? styles.active : ""
          }`}
        >
          그룹매칭
        </div>
        <div
          onClick={() => handleTabClick("personal")}
          className={`${styles.tab_item} ${
            tab === "personal" ? styles.active : ""
          }`}
        >
          개인매칭
        </div>
      </div>
      <div className={styles.form_container}>
        {tab === "group" && <GroupMatching />}
        {tab === "personal" && <PersonalMatch />}
      </div>
    </div>
  );
};

export default MatchPage;
