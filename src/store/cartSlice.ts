import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiOrders, CartDish, Dish, Orders } from '../types';
import { createOrder } from './dishesThunks';

interface CartState {
  cartDishes: CartDish[];
  order: ApiOrders;
  orderLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  order: {},
  orderLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );
      if (index !== -1) {
          state.cartDishes[index].amount++;
        } 
        else {
            state.cartDishes.push({
                amount: 1,
                dish: dish,
        });
      }
    },
    deleteCart: (state, { payload: index }: PayloadAction<number>) => {
        const id = state.cartDishes[index].dish.id;
        delete state.order[id];
        state.cartDishes.splice(index, 1);
    },
    clearCart: (state) => {
      state.cartDishes = [];
    },
    addOrder: (state, { payload: dish }: PayloadAction<Orders>) => {
        state.order = {
            ...state.order,
            [dish.id]: dish.amount,
        };
    },
  },
  extraReducers: (builder)=>{
    builder
        .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        })
        .addCase(createOrder.fulfilled, (state) => {
        state.orderLoading = false;
        })
        .addCase(createOrder.rejected, (state) => {
        state.orderLoading = false;
        });

  },
  selectors: {
    selectCartDishes: (state) => state.cartDishes,
    selectCartOrder: (state) => state.order,
  },
});

export const cartReducer = cartSlice.reducer;

export const { addDish, clearCart, deleteCart, addOrder} = cartSlice.actions;

export const { selectCartDishes, selectCartOrder } = cartSlice.selectors;
