import axios from "axios";

export const loginApi = async ({ username, password }) => {
  const res = await axios.post(
    "https://dummyjson.com/auth/login",
    { username, password },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
};
