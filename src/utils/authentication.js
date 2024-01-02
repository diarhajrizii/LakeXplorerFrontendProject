import axios from "axios";

export const isAuthenticated = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) return false;

    const { data: response } = await axios.get("/verify/token", {
      token,
    });

    const user_id = response.isValid ? response.user.id : 0;
    return { isValid: response.isValid, user_id };
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};
