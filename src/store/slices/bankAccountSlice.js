import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  bankAccount: [],
};
export const bankAccountSlice = createSlice({
  name: 'bankAccountSlice',
  initialState,
  reducers: {
    updateBankAccount: (state, actions) => {
      state.bankAccount = actions.payload;
    },
  },
});

export const {updateBankAccount} = bankAccountSlice.actions;

export const bankAccountState = state => state?.bankAccount?.bankAccount;

export default bankAccountSlice.reducer;
