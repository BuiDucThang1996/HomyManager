import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  token: '',
};
export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, actions) => {
      state.token = actions.payload;
    },
  },
});

export const {updateToken} = tokenSlice.actions;

export const token = state => state?.token?.token;

export default tokenSlice.reducer;
