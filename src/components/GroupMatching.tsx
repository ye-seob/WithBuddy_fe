import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useUserStore } from "../stores/userStore";
import styles from "../public/css/MatchPage.module.css";
import "../public/css/global.css";
import { loadGroupBuddy } from "../api/match";

interface BuddyData {
  name: string;
  major: string;
  studentId: string;
  instaId: string | undefined;
  kakaoId: string | undefined;
  mbti: string;
  bio: string | undefined;
}

const GroupMatching: React.FC = () => {
  const { major, studentId } = useUserStore();
  const [buddyData, setBuddyData] = useState<BuddyData[] | null>(null);
  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const data = await loadGroupBuddy(major, studentId);
        const filteredData = data.filter(
          (buddy: BuddyData) =>
            buddy.studentId.slice(2, 4) !== studentId.slice(2, 4) ||
            buddy.studentId === studentId
        );
        setBuddyData(filteredData);
      } catch (error) {
        console.error("Error fetching buddy data:", error);
      }
    };

    fetchBuddyData();
  }, [studentId, major]);

  return (
    <>
      {buddyData ? (
        buddyData.map((buddy, index) => (
          <div key={index} className={styles.profile}>
            <Profile
              studentId={buddy.studentId}
              name={buddy.name}
              instaId={buddy.instaId}
              kakaoId={buddy.kakaoId}
              mbti={buddy.mbti}
              bio={buddy.bio}
            />
          </div>
        ))
      ) : (
        <div>Loading..</div>
      )}
    </>
  );
};

export default GroupMatching;
