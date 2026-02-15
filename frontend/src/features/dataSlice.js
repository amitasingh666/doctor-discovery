import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const fetchCities = createAsyncThunk('data/fetchCities', async () => {
  const response = await API.get('/data/cities');
  return response.data;
});

export const fetchSpecialities = createAsyncThunk('data/fetchSpecialities', async () => {
  const response = await API.get('/data/specialities');
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { cities: [], specialities: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => { state.cities = action.payload; })
      .addCase(fetchSpecialities.fulfilled, (state, action) => { state.specialities = action.payload; });
  }
});

export default dataSlice.reducer;