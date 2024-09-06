import instance from "./API";

export const loadGroupBuddy = async (major: string, studentId: string) => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_API_BASE_URL}/match/groupMatch`,
      {
        params: { major, studentId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Buddy 불러오기 실패:", error);
    throw error;
  }
};

export const loadPersonalBuddy = async (major: string, studentId: string) => {
  try {
    const response = await instance.get(
      `${import.meta.env.VITE_API_BASE_URL}/match/personaMatch`,
      {
        params: { major, studentId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Buddy 불러오기 실패:", error);
    throw error;
  }
};
