import axios from "axios";

export const loginApi = async ({ username, password }) => {
  const res = await axios.post(
    "https://dummyjson.com/auth/login",
    { username, password },
    { headers: { "Content-Type": "application/json" } },
  );
  return res.data;
};

// export const loginApi = async ({ username, password }) => {
//   const res = await fetch("https://dummyjson.com/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username,
//       password,
//       expiresInMins: 30,
//     }),
//   });

//   if (!res.ok) {
//     throw new Error("Invalid username or password");
//   }

//   return await res.json();
// };
