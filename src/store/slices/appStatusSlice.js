import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  appStatus: 'loading',
};
export const appStatusSlice = createSlice({
  name: 'appStatusSlice',
  initialState,
  reducers: {
    updateAppStatus: (state, actions) => {
      state.appStatus = actions.payload;
    },
  },
});

export const {updateAppStatus} = appStatusSlice.actions;

export const appStatusState = state => state?.appStatus?.appStatus;

export default appStatusSlice.reducer;
