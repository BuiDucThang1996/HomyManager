import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  amenity: [],
};
export const amenitySlice = createSlice({
  name: 'appStatusSlice',
  initialState,
  reducers: {
    updateAmenity: (state, actions) => {
      state.amenity = actions.payload;
    },
  },
});

export const {updateAmenity} = amenitySlice.actions;

export const amenityState = (state: {amenity: {amenity: any}}) =>
  state?.amenity?.amenity;

export default amenitySlice.reducer;
