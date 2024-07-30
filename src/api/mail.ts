// src/api/mail.ts
import axios from "axios";

export const sendMail = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/send-mail`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    console.error("메일 전송 실패:", error);
    throw new Error("메일 전송에 실패했습니다. 다시 시도해 주세요.");
  }
};
export const sendFindMail = async (email: string, studentId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/mail/send-findPin-mail`,
      {
        email,
        studentId,
      },
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    console.error("메일 전송 실패:", error);
    throw new Error("메일 전송에 실패했습니다. 다시 시도해 주세요.");
  }
};
export const checkAuthCode = async (
  email: string,
  authCode: string
): Promise<string> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/mail/checkAuthCode`,
      {
        email,
        authCode,
      },
      {
        withCredentials: true,
      }
    );

    return response.status.toString();
  } catch (error) {
    console.error("인증코드 확인 실패:", error);
    throw new Error("인증코드 확인에 실패했습니다. 다시 시도해 주세요.");
  }
};
