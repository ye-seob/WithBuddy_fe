import instance from "./API";

export const laodRanking = async () => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_API_BASE_URL}/ranking/loadRanking`
    );
    return response.data;
  } catch (error) {
    console.error("불러오기 실패:", error);
    throw error;
  }
};
