import instance from "./API";

export const editUserInfo = async (
  studentId: string,
  newName: string,
  newPin?: string,
  newInstaId?: string,
  newKakaoId?: string,
  newBio?: string
): Promise<void> => {
  try {
    const response = await instance.put(
      `${import.meta.env.VITE_API_BASE_URL}/user/edit`,
      {
        newName,
        newPin: newPin || undefined,
        studentId,
        newInstaId,
        newKakaoId,
        newBio,
      }
    );
    if (response.status !== 200) {
      throw new Error("정보 수정 실패");
    }
  } catch (error) {
    console.error("정보 수정 실패:", error);
    throw error;
  }
};
