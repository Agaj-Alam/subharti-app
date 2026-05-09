// import axios from "axios";

// export const loginApi = async ({ username, password }) => {
//   const res = await axios.post(
//     "https://dummyjson.com/auth/login",
//     { username, password },
//     { headers: { "Content-Type": "application/json" } },
//   );
//   return res.data;
// };

import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "http://10.12.248.144:8080";
const BASE_URL = "http://10.157.234.144:8080";

export const loginApi = async (enrollment, dob) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ enrollment, dob }),
    });

    let data = {};

    // 🔥 SAFE JSON PARSE
    try {
      data = await response.json();
    } catch (e) {
      throw new Error("Server error");
    }

    // 🔥 HANDLE ERROR RESPONSE
    if (!response.ok) {
      throw new Error(data.error || "Wrong Enrollment / Password");
    }

    // ✅ store token
    await AsyncStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw error;
  }
};
