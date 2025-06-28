
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    profileData: null,
    loading: true,
    otherUsers: null,
    selectedUser: null, // <-- Added selectedUser
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload; // <-- Typo
  },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload; // <-- Added selectedUser reducer
    },
  }
});

export const { setUserData, setLoading, setOtherUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;