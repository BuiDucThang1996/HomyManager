import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  reloadStatus: '',
};
export const reloadStatusSlice = createSlice({
  name: 'reloadStatus',
  initialState,
  reducers: {
    updateReloadStatus: (state, actions) => {
      state.reloadStatus = actions.payload;
    },
  },
});

export const {updateReloadStatus} = reloadStatusSlice.actions;

export const reloadState = (state: {reload: {reloadStatus: any}}) =>
  state?.reload?.reloadStatus;

export default reloadStatusSlice.reducer;
