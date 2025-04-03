import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  contract: null,
};
const accountSlice = createSlice({
  initialState,
  name: "account",
  reducers: {
    setAccount(state, action) {
      state.account = action.payload;
    },
    setContract(state, action) {
      state.contract = action.payload;
    },
  },
});

export default accountSlice.reducer;
export const { setAccount, setContract } = accountSlice.actions;
