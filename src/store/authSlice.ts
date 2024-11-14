import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userRoleId: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  userRoleId: localStorage.getItem("userRoleId"),
  userId: localStorage.getItem("userId"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Omit<AuthState, "token">>) => {
      state.userRoleId = action.payload.userRoleId;
      state.userId = action.payload.userId;
    },
    clearAuthData: (state) => {
      state.userRoleId = null;
      state.userId = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
