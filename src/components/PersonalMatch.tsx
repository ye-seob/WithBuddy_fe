import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useUserStore } from "../stores/userStore";
import styles from "../public/css/MatchPage.module.css";
import "../public/css/global.css";
import { loadPersonalBuddy } from "../api/match";

interface BuddyData {
  name: string;
  major: string;
  studentId: string;
  instaId: string | undefined;
  kakaoId: string | undefined;
  mbti: string;
  bio: string | undefined;
}

const PersonalMatch: React.FC = () => {
  const { major, studentId } = useUserStore();
  const [buddyData, setBuddyData] = useState<BuddyData[] | null>(null);

  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const data = await loadPersonalBuddy(major, studentId);
        setBuddyData(data);
      } catch (error) {
        // 오류 처리 로직
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

export default PersonalMatch;
