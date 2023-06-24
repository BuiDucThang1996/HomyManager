import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  tenant: [],
};
export const tenantSlice = createSlice({
  name: 'tenantSlice',
  initialState,
  reducers: {
    updateTenant: (state, actions) => {
      state.tenant = actions.payload;
    },
  },
});

export const {updateTenant} = tenantSlice.actions;

export const tenantState = state => state?.tenant?.tenant;

export default tenantSlice.reducer;
