import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //redux initial state
  initialState: {
    user: null,
    composeMail: false,
    showInbox: "sentMails",
    openMail: null,
    openSideBar: false,
    darkMode: false,
    mailList: {
      sentMails: [],
      receiveMails: [],
      favMails: [],
    },
    mailObj: {
      mailTo: "",
      subject: "",
      body: "",
    },
  },
  //   reducers
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setComposeMail: (state, action) => {
      state.composeMail = action.payload.composeMail;
    },
    setInbox: (state, action) => {
      state.showInbox = action.payload.inbox;
    },
    addSendMail: (state, action) => {
      state.mailList.sentMails = [
        action.payload.mail,
        ...state.mailList.sentMails,
      ];
    },
    initializeSendMail: (state, action) => {
      state.mailList.sentMails = action.payload.items;
    },
    addReceiveMail: (state, action) => {
      state.mailList.receiveMails = [
        action.payload.mail,
        ...state.mailList.receiveMails,
      ];
    },
    initializeReceiveMail: (state, action) => {
      state.mailList.receiveMail = action.payload.items;
    },
    addFavMail: (state, action) => {
      state.mailList.favMails = [
        action.payload.mail,
        ...state.mailList.favMails,
      ];
    },
    initializeFavMail: (state, action) => {
      state.mailList.favMails = action.payload.items;
    },

    setOpenMail: (state, action) => {
      state.openMail = action.payload.item;
    },
    setSideBar: (state, action) => {
      state.openSideBar = action.payload.item;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload.darkMode;
    },
    setMailObj: (state, action) => {
      state.mailObj = action.payload.mailObj;
    },
  },
});
export const {
  login,
  logout,
  setComposeMail,
  addSendMail,
  initializeSendMail,
  setInbox,
  setOpenMail,
  addFavMail,
  initializeFavMail,
  setSideBar,
  setDarkMode,
  setMailObj,
} = userSlice.actions;
export const selectuser = (state) => state.user.user;
export const selectMailList = (state) => state.user.mailList;
export const selectComposeMail = (state) => state.user.composeMail;
export const selectslideBar = (state) => state.user.openSideBar;
export const selectShowInbox = (state) => state.user.showInbox;
export const selectmail = (state) => state.user.openMail;
export const selectDarkMode = (state) => state.user.darkMode;
export const selectMailObj = (state) => state.user.mailObj;
export default userSlice.reducer;
