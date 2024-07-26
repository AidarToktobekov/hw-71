import { configureStore } from '@reduxjs/toolkit';
import { dishesReducer } from '../store/dishesSlice';
import { cartReducer } from '../store/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    dishes: dishesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;