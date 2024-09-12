import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true, //쿠키 포함 요청
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        const accessToken = getCookie("accessToken");
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        return instance(originalRequest);
      } catch (error) {
        console.error("토큰 재발급 실패", error);
        alert("세션이 만료되었습니다 로그인 페이지로 이동합니다.");
        window.location.href = "/";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refreshToken`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("토큰 재발급 실패", error);
    throw new Error("토큰 재발급에 실패했습니다.");
  }
};

export default instance;
