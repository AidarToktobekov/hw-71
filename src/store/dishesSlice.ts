import { createSlice } from '@reduxjs/toolkit';
import { fetchDishes } from './dishesThunks';
import { Dish } from '../types';

interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
}

  const initialState: DishesState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
    createLoading: false,
    updateLoading: false,
  };

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
  selectors: {
    selectDishes: (state) => state.items,
    selectFetchDishesLoading: (state) => state.fetchLoading,
    selectDeleteDishLoading: (state) => state.deleteLoading,
    selectCreateDishLoading: (state) => state.createLoading,
    selectUpdateDishLoading: (state) => state.updateLoading,
  },
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectDishes,
  selectFetchDishesLoading,
  selectDeleteDishLoading,
  selectCreateDishLoading,
  selectUpdateDishLoading,
} = dishesSlice.selectors;
