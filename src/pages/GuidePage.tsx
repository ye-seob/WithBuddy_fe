import styles from "../public/css/GuidePage.module.css";
import signup1 from "../public/img/signup1.png";
import signup2 from "../public/img/signup2.png";
import signup3 from "../public/img/signup3.png";
import loginPage from "../public/img/loginPage.png";
import matchPage from "../public/img/matchPage.png";
import profile from "../public/img/profile.png";
import rankingPage from "../public/img/rankingPage.png";
import editPage from "../public/img/editPage.png";
import settingPage from "../public/img/settingPage.png";

const GuidePage = () => {
  return (
    <div className={styles.container}>
      <span className={styles.header}>
        안녕하세요! Withbuddy에 오신 것을 환영합니다.
        <br />
        <br /> Withbuddy는 'Buddy'라는 단어에서 영감을 받아, '친구와 함께'라는
        의미를 담고 있습니다.
        <br />
        <br />
        이 서비스는 <br />
        고려대학교와 서강대학교에서 실행되는 '뻔선뻔후'에서 비롯해
        개발되었습니다.
        <br />
        <br />
        서경대학교의 학번은 총 10자리로, '2023(입학년도) + 216(학과코드) +
        049(개인번호)'로 구성됩니다
        <br />
        <br />이 서비스는 같은 학과의 학생들 중 개인번호가 같은 선후배 매칭을
        제공합니다.
        <br />
        <br />
        Ex) 2023 216 049 <br /> 2024 216 049
      </span>

      <div className={styles.signupStep}>
        <img src={signup1} alt="회원가입 1단계" className={styles.image} />
        <p className={styles.description}>
          다음과 같이 이름, 학번과 같은 정보를 입력해주세요.
        </p>
      </div>

      <div className={styles.signupStep}>
        <img src={signup2} alt="회원가입 2단계" className={styles.image} />
        <p className={styles.description}>
          꼭 서경대학교 이메일로 적어 인증을 진행해주세요!
          <br />
          자신의 인스타 아이디 혹은 카톡 아이디 중 하나 이상을 작성해주세요!
        </p>
      </div>

      <div className={styles.signupStep}>
        <img src={signup3} alt="회원가입 3단계" className={styles.image} />
        <p className={styles.description}>
          간단한 자기소개 또는 하고싶은 말을 적을 수 있고 MBTI를 선택하면 가입이
          가능합니다!
        </p>
      </div>

      <div className={styles.signupStep}>
        <img src={loginPage} alt="로그인 페이지" className={styles.image} />
        <p className={styles.description}>
          로그인을 하면 다음과 같이 매칭 페이지가 보입니다.
        </p>
      </div>

      <div className={styles.signupStep}>
        <img src={matchPage} alt="매치 페이지" className={styles.image} />
        <img src={profile} alt="프로필" className={styles.image} />
        <p className={styles.description}>
          Buddy의 프로필을 눌러 상대방의 정보를 확인할 수 있어요.
        </p>
      </div>

      <div className={styles.signupStep}>
        <img src={rankingPage} alt="랭킹 페이지" className={styles.image} />
        <p className={styles.description}>
          랭킹 페이지에선 각 학과의 학생 수를 기반으로 랭킹을 매겼어요!
        </p>
      </div>

      <div className={styles.signupStep}>
        <img src={editPage} alt="에딧 페이지" className={styles.image} />
        <p className={styles.description}>수정 페이지에선 수정이 가능합니다.</p>
      </div>

      <div className={styles.signupStep}>
        <img src={settingPage} alt="설정 페이지" className={styles.image} />
        <p className={styles.description}>
          설정 페이지에서 메일 및 회원탈퇴가 가능합니다.
        </p>
      </div>
    </div>
  );
};

export default GuidePage;
