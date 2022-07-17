import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { getInitialImages, searchImages } from './imagesAPI';
import { Image, SearchImages } from './types';

export interface CounterState {
  images: Image[];
}

const initialState: CounterState = {
  images: []
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const search = createAsyncThunk(
  'images/search',
  async (args: SearchImages) => {
    const response = await searchImages(args);
    console.log(response);
    return response;
  }
);

export const initialLoad = createAsyncThunk(
  'images/init',
  async () => {
    const response = await getInitialImages();
    console.log(response);
    return response;
  }
);

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initialLoad.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.images = action.payload;
      })
  },
});


export const selectImages = (state: RootState) => state.images.images;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default imagesSlice.reducer;
