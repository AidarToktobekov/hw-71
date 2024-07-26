import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../app/store';
import axiosApi from '../axiosApi';
import { ApiDish, ApiDishes, ApiOrders, Dish } from '../types';

export const fetchDishes = createAsyncThunk<
  Dish[],
  undefined,
  { dispatch: AppDispatch }
>('dishes/fetchDishes', async () => {
  const dishesResponse = await axiosApi.get<ApiDishes | null>('/dishes.json');
  const dishes = dishesResponse.data;

  let newDishes: Dish[] = [];

  if (dishes) {
    newDishes = Object.keys(dishes).map((key: string) => {
      const dish = dishes[key];
      return {
        id: key,
        ...dish,
      };
    });
  }
  return newDishes;
});

export const deleteDishes = createAsyncThunk<void, string>(
  'dishes/deleteDish',
  async (dishId) => {
    await axiosApi.delete('/dishes/' + dishId + '.json');
  },
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (apiDish) => {
    await axiosApi.post('/dishes.json', apiDish);
  },
);

export const createOrder = createAsyncThunk<void, ApiOrders>(
  'orders/create',
  async (apiOrders) => {
    await axiosApi.post('/orders.json', apiOrders);
  },
);

export const fetchOneDish = createAsyncThunk<ApiDish, string>(
  'dishes/fetchOne',
  async (id) => {
    const { data: dish } = await axiosApi.get<ApiDish | null>(
      `/dishes/${id}.json`,
    );

    if (dish === null) {
      throw new Error('Not found');
    }

    return dish;
  },
);

export interface UpdateDishArg {
  id: string;
  apiDish: ApiDish;
}

export const updateDish = createAsyncThunk<void, UpdateDishArg>(
  'dishes/update',
  async ({ id, apiDish }) => {
    await axiosApi.put(`/dishes/${id}.json`, apiDish);
  },
);
