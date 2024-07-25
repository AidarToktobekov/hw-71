export interface Dish{ 
    title: string;
    price: number;
    image: string;
    id: string;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
    [id: string]: ApiDish;
  }
  