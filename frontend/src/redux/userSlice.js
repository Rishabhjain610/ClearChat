
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    profileData: null,
    loading: true,
    otherUsers: null,
    selectedUser: null,
    socket:null,
    onlineUsers:null,
    searchData:null // <-- Added searchData
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
    setSocket: (state, action) => {
      state.socket = action.payload; // <-- Added socket reducer
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload; // <-- Added onlineUsers reducer
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload; // <-- Added searchData reducer
    }
  }
});

export const { setUserData, setLoading, setOtherUsers, setSelectedUser, setSocket, setOnlineUsers, setSearchData } = userSlice.actions;
export default userSlice.reducer;