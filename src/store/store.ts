import {configureStore} from '@reduxjs/toolkit';
import tokenSlice from './slices/tokenSlice';
import userInforSlice from './slices/userInforSlice';
import reloadSlice from './slices/reloadSlice';
import appStatusSlice from './slices/appStatusSlice';
import houseInforSlice from './slices/houseInforSlice';
import bankAccountSlice from './slices/bankAccountSlice';
import amenitySlice from './slices/amenitySlice';
import serviceSlice from './slices/serviceSlice';
import tenantSlice from './slices/tenantSlice';
export const store = configureStore({
  reducer: {
    token: tokenSlice,
    userInfor: userInforSlice,
    reload: reloadSlice,
    appStatus: appStatusSlice,
    houseInfor: houseInforSlice,
    bankAccount: bankAccountSlice,
    amenity: amenitySlice,
    service: serviceSlice,
    tenant: tenantSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
