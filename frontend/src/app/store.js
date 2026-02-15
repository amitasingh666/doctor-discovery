import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from '../features/doctorSlice';
import dataReducer from '../features/dataSlice';

export const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    data: dataReducer,
  },
});