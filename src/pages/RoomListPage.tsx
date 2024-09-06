import React, { useEffect, useState } from "react";
import { useUserStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { loadGroupBuddy } from "../api/match";
import { CiUser } from "react-icons/ci";
import styles from "../public/css/RoomListPage.module.css";

export interface BuddyData {
  name: string;
  major: string;
  studentId: string;
  instaId: string | undefined;
  kakaoId: string | undefined;
  mbti: string;
  bio: string | undefined;
}

const RoomListPage: React.FC = () => {
  const { major, studentId } = useUserStore();
  const [buddyData, setBuddyData] = useState<BuddyData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const data = await loadGroupBuddy(major, studentId);
        const filteredData = data.filter(
          (buddy: BuddyData) =>
            buddy.studentId.slice(2, 4) !== studentId.slice(2, 4)
        );
        setBuddyData(filteredData);
      } catch (error) {
        console.error("데이터를 불러오는데 실패하였습니다:", error);
      }
    };
    fetchBuddyData();
  }, [studentId, major]);

  const handleRoomClick = (buddy: BuddyData) => {
    navigate(`/chat/${buddy.studentId}`, { state: buddy });
  };

  return (
    <div className={styles.roomList_container}>
      <header className={styles.header_section}>
        <h1 className={styles.title}>채팅 방</h1>
      </header>

      <div className={styles.room_list}>
        {buddyData ? (
          buddyData.map((buddy, index) => (
            <div
              key={index}
              className={styles.room_item}
              onClick={() => handleRoomClick(buddy)}
            >
              <div className={styles.room_item_avatar}>
                <CiUser size={24} />
              </div>
              <div className={styles.room_item_info}>
                <h2 className={styles.room_item_name}>{buddy.name}</h2>
                <p className={styles.room_item_details}>
                  {buddy.major} • {buddy.mbti}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.loading}>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default RoomListPage;
