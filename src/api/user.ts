import axios from "axios";

interface SignupData {
  name: string;
  studentId: string;
  major: string;
  pin: string;
  pinConfirm: string;
  email: string;
  instaId?: string;
  kakaoId?: string;
  mbti: string;
  bio?: string;
}

interface LoginData {
  studentId: string;
  pin: string;
}

interface LoginResponse {
  userName: string;
  major: string;
  instaId?: string;
  kakaoId?: string;
  mbti: string;
}

axios.defaults.withCredentials = true;

export const signup = async (data: SignupData): Promise<string> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("가입 실패:", error);
    throw new Error("가입에 실패했습니다. 다시 시도해 주세요.");
  }
};
export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/login`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("로그인 실패:", error);
    throw new Error("로그인에 실패했습니다. 다시 시도해 주세요.");
  }
};

export const logout = async (): Promise<number> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
      {
        withCredentials: true,
      }
    );
    return response.status;
  } catch (error) {
    console.error("로그아웃 실패:", error);
    throw new Error("로그아웃에 실패했습니다. 다시 시도해 주세요.");
  }
};
