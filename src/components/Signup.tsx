import { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import Input from "./Input";
import Button from "./Button";
import { checkAuthCode, sendMail } from "../api/mail";
import { signup } from "../api/user";
import styles from "../public/css/Signup.module.css";
import { mbtiList } from "../util/mbti";
import { majors } from "../util/major.ts";
import AlertMessage from "../components/AlertMessage";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("소프트웨어학과");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [instaId, setInstaId] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [mbti, setMbti] = useState("");
  const [bio, setBio] = useState(""); // 한줄소개 상태 추가
  const [checkedAuthCode, setCheckedAuthCode] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  const validate = (): boolean => {
    if (!/^[0-9]{10}$/.test(studentId)) {
      setAlertErrorMessage("학번을 올바르게 입력해주세요.");
      return false;
    }
    if (!/^[0-9]{4}$/.test(pin)) {
      setAlertErrorMessage("PIN 번호는 4자리 숫자여야 합니다.");
      return false;
    }
    if (pin !== pinConfirm) {
      setAlertErrorMessage("PIN 번호가 일치하지 않습니다.");
      return false;
    }
    if (!/^[\w-.]+@skuniv\.ac\.kr$/.test(email)) {
      setAlertErrorMessage("유효한 서경 이메일을 입력해주세요.");
      return false;
    }
    if (!authCode) {
      setAlertErrorMessage("인증번호를 입력해주세요.");
      return false;
    }
    if (!checkedAuthCode) {
      setAlertErrorMessage("인증번호 불일치");
      return false;
    }
    if (!instaId && !kakaoId) {
      setAlertErrorMessage(
        "인스타그램 또는 카카오톡 아이디를 하나 이상 입력해주세요."
      );
      return false;
    }
    return true;
  };

  const handleAuthCodeSubmit = async () => {
    try {
      const response = await checkAuthCode(email, authCode);
      if (response === "200") {
        setCheckedAuthCode(true);
        setAlertMessage("인증 성공");
      } else {
        setAlertErrorMessage("인증에 실패했습니다");
      }
    } catch (error) {
      console.error(error);
      setAlertErrorMessage("인증 중 오류 발생");
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      const response = await signup({
        name,
        studentId,
        major,
        pin,
        pinConfirm,
        email,
        instaId,
        kakaoId,
        mbti,
        bio,
      });

      alert(response);
      setIsModalOpen(false);
      navigate(0);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleMbtiClick = (type: string) => {
    setMbti(type);
  };

  const handleMajorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMajor(e.target.value);
  };

  const handleSendMail = async () => {
    try {
      setAlertMessage("전송되었습니다.");
      const result = await sendMail(email);
      if (result != 200) {
        setAlertErrorMessage("메일 전송에 실패하였습니다.");
      }
    } catch (error) {
      setAlertErrorMessage("메일 전송에 실패하였습니다.");
    }
  };

  return (
    <>
      <label className={styles.label}>인적사항</label>
      <Input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="학번 Ex) 2023216049"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <div className={styles.select_container}>
        <select
          value={major}
          onChange={handleMajorChange}
          className={styles.select}
        >
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
      <Input
        type="text"
        placeholder="Pin 번호 Ex) 1234"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Pin 번호 확인"
        value={pinConfirm}
        onChange={(e) => setPinConfirm(e.target.value)}
      />
      <label className={styles.label}>서경 이메일 인증</label>
      <div className={styles.input_with_button}>
        <Input
          type="text"
          placeholder="Ex) WithBuddy@skuniv.ac.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="전송" onClick={handleSendMail} />
      </div>
      <div className={styles.input_with_button}>
        <Input
          type="text"
          placeholder="인증번호"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <Button text="확인" onClick={handleAuthCodeSubmit} />
      </div>

      <label className={styles.label}>SNS 아이디</label>
      <Input
        type="text"
        placeholder="인스타 아이디"
        value={instaId}
        onChange={(e) => setInstaId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="카카오톡 아이디"
        value={kakaoId}
        onChange={(e) => setKakaoId(e.target.value)}
      />
      <label className={styles.label}>MBTI</label>
      <div className={styles.mbti_container}>
        {mbtiList.map((type) => (
          <button
            key={type}
            className={`${styles.mbti_button} ${
              mbti === type ? styles.selected : ""
            }`}
            onClick={() => handleMbtiClick(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <label className={styles.label}>한줄소개</label>
      <Input
        type="text"
        placeholder="한줄소개를 입력해주세요 (최대 25자)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <Button text="가입" onClick={handleSubmit} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="회원가입 정보 확인"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContent}>
          <h2>입력한 정보가 맞습니까?</h2>
          <p>이름: {name}</p>
          <p>학번: {studentId}</p>
          <p>전공: {major}</p>
          <p>Email: {email}</p>
          <p>인스타 아이디: {instaId}</p>
          <p>카카오톡 아이디: {kakaoId}</p>
          <p>MBTI: {mbti}</p>
          <p>한줄소개: {bio}</p> {/* 한줄소개 추가 */}
          <div className={styles.modalButtons}>
            <Button text="취소" onClick={() => setIsModalOpen(false)} />
            <Button text="확인" onClick={handleConfirmSubmit} />
          </div>
        </div>
      </Modal>
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

export default Signup;
