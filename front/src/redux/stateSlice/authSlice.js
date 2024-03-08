import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url } from "../config";

const initialState = {
  user: "",
  token: "",
  loadingBar: false,
  error: "",
  message: "",
  userDetail: "",
  IsLogin: false,
  cart: "",
};

// const loginToken = localStorage.getItem("logintoken");
// console.log("token", loginToken);

//show user

export const showUserDetail = createAsyncThunk(
  "showUserDetail",
  async (_, { rejectWithValue }) => {
    try {
      const loginToken = localStorage.getItem("logintoken");
      const response = await axios.get(`${api_url}/user_details`, {
        headers: {
          Authorization: `${loginToken}`,
        },
      });
      const result = await response;
      // console.log("redux-res", result);
      return result;
    } catch (error) {
      console.log("redux-error", error);
      return rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const loginToken = localStorage.getItem("logintoken");
      const response = await axios.post(`${api_url}/auth/user_info`, userData, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      const result = await response;
      // console.log("redux-res", result.data);
      return result;
    } catch (error) {
      console.log("redux-error", error);
      if (error.response) {
        console.error("Server Error user-info:", error.response.data);
      } else if (error.request) {
        console.error("No response received.");
      } else {
        console.error("Request failed user-info:", error.message);
      }
      return rejectWithValue(error);
    }
  }
);

export const cartDetail = createAsyncThunk(
  "cartDetail",
  async (userData, { rejectWithValue }) => {
    try {
      const loginToken = localStorage.getItem("logintoken");
      const response = await axios.get(`${api_url}/get_all_product_cart`, {
        headers: {
          Authorization: `${loginToken}`,
        },
      });
      const result = await response;
      // console.log("redux-res", result.data);
      return result;
    } catch (error) {
      console.log("redux-error", error);
      if (error.response) {
        console.error("Server Error user-info:", error.response.data);
      } else if (error.request) {
        console.error("No response received.");
      } else {
        console.error("Request failed user-info:", error.message);
      }
      return rejectWithValue(error);
    }
  }
);

// export const updateUserProfile = createAsyncThunk(
//   "updateUserProfile",
//   async ({userData , loginToken}, { rejectWithValue }) => {
//     console.log("data12", userData);
//     try {
//       const response = await axios.post(`${api_url}/auth/user_info`, userData ,{
//         headers: {
//           Authorization: `Bearer ${loginToken}`,
//         },
//       });
//       const result = await response;
//       console.log("redux-res", result.data);
//       return result;
//     } catch (error) {
//       console.log("redux-error", error);
//       if (error.response) {
//         console.error("Server Error user-info:", error.response.data);
//       } else if (error.request) {
//         console.error("No response received.");
//       } else {
//         console.error("Request failed user-info:", error.message);
//       }
//       return rejectWithValue(error);
//     }
//   }
// );

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Show User Detail
      .addCase(showUserDetail.pending, (state, action) => {
        state.loadingBar = true;
      })
      .addCase(showUserDetail.fulfilled, (state, action) => {
        state.loadingBar = false;
        state.userDetail = action.payload.data;
        state.user = action.payload.data;
        state.message = "";
      })
      .addCase(showUserDetail.rejected, (state, action) => {
        state.user = "";
        state.loadingBar = false;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload.response.data;
      })

      // cart detail
      .addCase(cartDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cartDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(cartDetail.rejected, (state, action) => {
        state.loading = false;
        state.cart = action.payload.response.data;
      });
  },
});

export default authSlice.reducer;
