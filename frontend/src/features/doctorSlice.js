import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

// ACTIONS
export const fetchCities = createAsyncThunk('data/fetchCities', async () => (await API.get('/data/cities')).data);
export const fetchSpecialities = createAsyncThunk('data/fetchSpecialities', async () => (await API.get('/data/specialities')).data);

export const fetchTopDoctors = createAsyncThunk('doctors/fetchTop', async () => (await API.get('/doctors?sort=top&limit=4')).data.data);
export const fetchDoctors = createAsyncThunk('doctors/fetchAll', async (params) => (await API.get('/doctors', { params })).data);
export const fetchDoctorById = createAsyncThunk('doctors/fetchOne', async (id) => (await API.get(`/doctors/${id}`)).data.data);
export const registerDoctor = createAsyncThunk('doctors/register', async (formData) => await API.post('/doctors/register', formData));

// SLICE
const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    cities: [], specialities: [], topDoctors: [], list: [], selectedDoctor: null,
  },
  reducers: {
    resetList: (state) => { state.list = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => { state.cities = action.payload; })
      .addCase(fetchSpecialities.fulfilled, (state, action) => { state.specialities = action.payload; })
      .addCase(fetchTopDoctors.fulfilled, (state, action) => { state.topDoctors = action.payload; })
      .addCase(fetchDoctorById.fulfilled, (state, action) => { state.selectedDoctor = action.payload; })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
    if(action.meta.arg.page === 1) state.list = action.payload.data; // THIS IS CORRECT
    else state.list = [...state.list, ...action.payload.data];
});
  }
});

export const { resetList } = doctorSlice.actions;
export default doctorSlice.reducer;