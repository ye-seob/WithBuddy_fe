import React, { useState } from "react";
import Modal from "react-modal";
import styles from "../public/css/Profile.module.css";
import {
  FaInstagram,
  FaUser,
  FaClipboard,
  FaAddressCard,
} from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import AlertMessage from "../components/AlertMessage";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

interface ProfileProps {
  studentId: string;
  name: string;
  instaId: string | undefined;
  kakaoId: string | undefined;
  mbti: string;
  bio: string | undefined;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  studentId,
  instaId,
  kakaoId,
  mbti,
  bio,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };
  toastr.options = {
    positionClass: "toast-top-center",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "slideDown",
    hideMethod: "fadeOut",
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const showSuccess = () => {
    toastr.success("클립보드에 복사되었습니다.");
  };
  const handleCopyClick = (text: string | undefined) => {
    navigator.clipboard.writeText(text ?? "");
    showSuccess();
  };

  const year = studentId.slice(2, 4);

  return (
    <>
      <div className={styles.profileCard} onClick={handleProfileClick}>
        <h2 className={styles.profileNum}>{year}학번</h2>
        <h3 className={styles.profileName}>{name}</h3>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Profile Modal"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <button className={styles.closeButton} onClick={handleCloseModal}>
          X
        </button>
        <div className={styles.modalHeader}>
          {year}학번 {name}
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalItem}>
            <FaInstagram size={20} color="#E1306C" />
            <span className={styles.snsIdText}>
              인스타 아이디 : {instaId || "없음"}
            </span>

            <div
              className={styles.copyIcon}
              onClick={() => handleCopyClick(instaId)}
            >
              {instaId && <FaClipboard size={20} />}
            </div>
          </div>
          <div className={styles.modalItem}>
            <RiKakaoTalkFill size={20} color="#FFD700" />
            <span className={styles.snsIdText}>
              카톡 아이디 : {kakaoId || "없음"}
            </span>

            <div
              className={styles.copyIcon}
              onClick={() => handleCopyClick(kakaoId)}
            >
              {kakaoId && <FaClipboard size={20} />}
            </div>
          </div>
          <div className={styles.modalItem}>
            <FaUser size={20} color="#6f7d47" />
            <span className={styles.snsIdText}>MBTI : {mbti}</span>
          </div>
        </div>
        <div className={styles.modalItem}>
          <FaAddressCard size={20} color="#6495ED" />
          <span className={styles.snsIdText}>한줄소개: {bio}</span>
        </div>
      </Modal>

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          type="success"
          onClose={() => setAlertMessage("")}
        />
      )}
    </>
  );
};

export default Profile;
