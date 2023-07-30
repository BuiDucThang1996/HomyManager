import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  userInfor: {},
};
export const userInforSlice = createSlice({
  name: 'userInfor',
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      state.userInfor = actions.payload;
    },
  },
});

export const {updateUser} = userInforSlice.actions;

export const userInfor = (state: { userInfor: { userInfor: any; }; }) => state?.userInfor?.userInfor;

export default userInforSlice.reducer;
