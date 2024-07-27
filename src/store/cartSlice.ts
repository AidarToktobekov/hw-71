import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiOrders, CartDish, Dish, DishesFromOrders, Orders } from '../types';
import { createOrder, fetchOneOrder, fetchOrders } from './dishesThunks';

interface CartState {
  cartDishes: CartDish[];
  order: ApiOrders;
  orderLoading: boolean;
  orders: ApiOrders[];
  dishesFromOrders: DishesFromOrders[];
  fetchOneLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  order: {},
  orders: [],
  orderLoading: false,
  dishesFromOrders: [],
  fetchOneLoading: false,
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
    builder
        .addCase(fetchOrders.pending, (state) => {
        state.orderLoading = true;
        })
        .addCase(fetchOrders.fulfilled, (state, { payload: items }) => {
        state.orderLoading = false;
        state.orders = items;
        })
        .addCase(fetchOrders.rejected, (state) => {
        state.orderLoading = false;
        });
    builder
        .addCase(fetchOneOrder.pending, (state) => {
          state.fetchOneLoading = true;
        })
        .addCase(fetchOneOrder.fulfilled, (state, { payload: order }) => {
          state.dishesFromOrders.push(order);
          state.fetchOneLoading = false;
        })
        .addCase(fetchOneOrder.rejected, (state) => {
          state.fetchOneLoading = false;
        });
  },
  selectors: {
    selectCartDishes: (state) => state.cartDishes,
    selectCartOrder: (state) => state.order,
    selectCartOrders: (state) => state.orders,
    selectCartDishesFromOrders: (state) => state.dishesFromOrders,
  },
});

export const cartReducer = cartSlice.reducer;

export const { addDish, clearCart, deleteCart, addOrder} = cartSlice.actions;

export const { selectCartDishes, selectCartOrder, selectCartOrders, selectCartDishesFromOrders} = cartSlice.selectors;
