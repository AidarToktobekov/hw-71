export interface Dish{ 
    title: string;
    price: string;
    image: string;
    id: string;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
    [id: string]: ApiDish;
}

export interface ApiOrders {
    [id: string]: number;
}

export interface Orders {
    id: string;
    amount: number;
}
  
export interface CartDish{
    dish: Dish;
    amount: number;
}