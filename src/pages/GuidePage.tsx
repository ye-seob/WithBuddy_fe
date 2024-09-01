import styles from "../public/css/GuidePage.module.css";
import match from "../public/img/match.png";
import profile from "../public/img/profile.png";
import ranking from "../public/img/ranking.png";
import edit from "../public/img/edit.png";
import setting from "../public/img/setting.png";

const GuidePage = () => {
  return (
    <div className={styles.container}>
      <span className={styles.header}>
        <p>
          With Buddy는 '친구와 함께'라는 의미를 담고 있으며 서경대학교 학생들이
          학번을 매개로 서로 가까워질 수 있도록 돕는 서비스입니다.
          <br /> <br /> 이 프로젝트는 다른 대학에서 성공적으로 운영되고 있는
          '뻔선뻔후'에서 영감을 받아 개발된 1인 프로젝트입니다.
        </p>
      </span>
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <p className={styles.description}>
        로그인을 하면 다음과 같이 매칭 페이지가 보입니다
      </p>
      <br />
      <div className={styles.signupStep}>
        <img src={match} alt="매치 페이지" className={styles.image} />
        <br />
        <img src={profile} alt="프로필" className={styles.image} />
        <p className={styles.description}>
          Buddy의 프로필을 눌러 상대방의 정보를 확인할 수 있어요.
        </p>
      </div>
      <br />
      <div className={styles.signupStep}>
        <img src={ranking} alt="랭킹 페이지" className={styles.image} />
        <p className={styles.description}>
          <br />
          랭킹 페이지에선 각 학과의 학생 수를 기반으로 랭킹을 볼 수 있어요.
        </p>
      </div>
      <br />
      <div className={styles.signupStep}>
        <img src={edit} alt="에딧 페이지" className={styles.image} />
        <p className={styles.description}>
          <br />
          수정 페이지에선 학번 학과를 제외한 나머지 정보들을 수정 할 수 있어요.
        </p>
        <br />
      </div>
      <div className={styles.signupStep}>
        <br />
        <img src={setting} alt="설정 페이지" className={styles.image} />
        <br />
        <p className={styles.description}>
          설정 페이지에서 공지 및 회원탈퇴가 가능합니다.
        </p>
      </div>
    </div>
  );
};

export default GuidePage;
