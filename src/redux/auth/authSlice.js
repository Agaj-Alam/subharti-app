// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { loginApi } from "./authApi";

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (data, thunkApi) => {
//     try {
//       return await loginApi(data);
//     } catch (err) {
//       return thunkApi.rejectWithValue("Invalid username or password");
//     }
//   },
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;








import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "./authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { enrollment, dob } = payload;
      return await loginApi(enrollment, dob);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },

  // 🔥 ADD THIS BLOCK
  reducers: {
    logout: (state) => {
      state.token = null;   // ✅ clear token
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🔥 EXPORT LOGOUT
export const { logout } = authSlice.actions;

export default authSlice.reducer;