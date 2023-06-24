import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  houseInfor: [],
};
export const houseInforSlice = createSlice({
  name: 'houseInforSlice',
  initialState,
  reducers: {
    updateHouseInfor: (state, actions) => {
      state.houseInfor = actions.payload;
    },
  },
});

export const {updateHouseInfor} = houseInforSlice.actions;

export const houseState = state => state?.houseInfor?.houseInfor;

export default houseInforSlice.reducer;
