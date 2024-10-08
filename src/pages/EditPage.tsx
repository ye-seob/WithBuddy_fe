import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import styles from "../public/css/EditPage.module.css";
import "../public/css/global.css";
import { useUserStore } from "../stores/userStore";
import { editUserInfo } from "../api/edit";
import AlertMessage from "../components/AlertMessage";

const EditPage: React.FC = () => {
  const {
    name,
    setName,
    major,
    studentId,
    instaId,
    kakaoId,
    setInstaId,
    setKakaoId,
    setBio,
  } = useUserStore();

  const [tempName, setTempName] = useState(name);
  const [newPin, setNewPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [tempInstaId, setTempInstaId] = useState(instaId);
  const [tempKakaoId, setTempKakaoId] = useState(kakaoId);
  const [tempBio, setTempBio] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  const handleSave = async () => {
    if (newPin || pinConfirm) {
      if (!/^\d{4}$/.test(newPin)) {
        setAlertErrorMessage("PIN 번호는 숫자여야 합니다.");
        return;
      }
      if (newPin.length !== 4) {
        setAlertErrorMessage("PIN 번호는 네 자리입니다.");
        return;
      }
      if (newPin !== pinConfirm) {
        setAlertErrorMessage("PIN 번호가 일치하지 않습니다.");
        return;
      }
    }

    try {
      await editUserInfo(
        studentId,
        tempName,
        newPin,
        tempInstaId,
        tempKakaoId,
        tempBio
      );
      setName(tempName);
      setInstaId(tempInstaId);
      setKakaoId(tempKakaoId);
      setBio(tempBio);
      setAlertMessage("변경되었습니다.");
    } catch (error) {
      setAlertErrorMessage("변경에 실패하였습니다.");
    }
  };

  return (
    <>
      <div className={styles.header_section}>
        <span className={styles.title}>회원 정보 수정</span>
      </div>
      <div className={styles.form}>
        <label className={styles.label}>인적사항</label>
        <Input
          type="text"
          placeholder="이름"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
        <Input
          type="text"
          readOnly={true}
          placeholder="학과"
          value={major}
          onChange={(e) => {
            e.target;
          }}
        />
        <Input
          type="text"
          readOnly={true}
          placeholder="학번"
          value={studentId}
          onChange={(e) => {
            e.target;
          }}
        />
        <Input
          type="password"
          placeholder="새로운 PIN번호"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
        />
        <Input
          type="password"
          placeholder="새로운 PIN번호 확인"
          value={pinConfirm}
          onChange={(e) => setPinConfirm(e.target.value)}
        />
        <label className={styles.label}>SNS 아이디</label>
        <Input
          type="text"
          placeholder="제공되지 않는 서비스입니다"
          //value={tempInstaId}
          value=""
          readOnly={true}
          onChange={(e) => setTempInstaId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="제공되지 않는 서비스입니다"
          readOnly={true}
          //value={tempKakaoId}
          value=""
          onChange={(e) => setTempKakaoId(e.target.value)}
        />
        <label className={styles.label}>한줄 소개</label>
        <Input
          type="text"
          placeholder="한줄소개를 입력해주세요 (최대 25자)"
          value={tempBio}
          onChange={(e) => setTempBio(e.target.value)}
        />
        <Button text="저장" onClick={handleSave} />
      </div>
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          type="success"
          onClose={() => setAlertMessage("")}
        />
      )}
      {alertErrorMessage && (
        <AlertMessage
          message={alertErrorMessage}
          type="error"
          onClose={() => setAlertErrorMessage("")}
        />
      )}
    </>
  );
};

export default EditPage;
