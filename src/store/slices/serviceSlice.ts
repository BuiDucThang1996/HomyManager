import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  service: [],
};
export const serviceSlice = createSlice({
  name: 'appStatusSlice',
  initialState,
  reducers: {
    updateService: (state, actions) => {
      state.service = actions.payload;
    },
  },
});

export const {updateService} = serviceSlice.actions;

export const serviceState = (state: {service: {service: any}}) =>
  state?.service?.service;

export default serviceSlice.reducer;
