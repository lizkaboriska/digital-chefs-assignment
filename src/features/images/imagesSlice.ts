import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { listImages, searchImages } from './imagesAPI';
import { Image, ListImages, SearchImages } from './types';

export interface CounterState {
  images: Image[];
  totalPages: number;
  isLoading: boolean;
}

const initialState: CounterState = {
  images: [],
  totalPages: 0,
  isLoading: false
};

export const search = createAsyncThunk(
  'images/search',
  async (args: SearchImages) => {
    const response = await searchImages(args);
    return response;
  }
);

export const list = createAsyncThunk(
  'images/list',
  async (args?: ListImages) => {
    const response = await listImages({page: args?.page});
    return response;
  }
);

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(list.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(list.fulfilled, (state, action) => {
        state.images = action.payload.images;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(search.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.images = action.payload.images;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
  },
});


export const selectImages = (state: RootState) => state.images.images;
export const selectTotalPages = (state: RootState) => state.images.totalPages;
export const selectIsLoading = (state: RootState) => state.images.isLoading;

export default imagesSlice.reducer;
