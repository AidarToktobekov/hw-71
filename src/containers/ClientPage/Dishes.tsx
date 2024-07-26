import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDishes, selectFetchDishesLoading } from "../../store/dishesSlice";
import { fetchDishes } from "../../store/dishesThunks";
import Spinner from "../../components/Spinner/Spinner";
import { NavLink } from "react-router-dom";
import { addDish, clearCart, selectCartDishes } from "../../store/cartSlice";
import { Dish } from "../../types";

const Dishes = ()=>{
    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const dishesLoading = useAppSelector(selectFetchDishesLoading); 
    const carts = useAppSelector(selectCartDishes); 

    const addToBasket = (dish: Dish)=>{
        dispatch(addDish(dish));
    }

    useEffect(()=>{
        dispatch(fetchDishes())
    }, [dispatch])

    const total = carts.reduce((sum, carts) => {
        return sum + carts.amount * Number(carts.dish.price);
    }, 0);

    const emptyTrash = ()=>{
        dispatch(clearCart())
    }

    return(
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">
                        Turtle Pizza
                    </NavLink>
                </div>
            </nav>
            <div className="container mt-3">

                <div className="list-group">
                    {dishesLoading ? ( <Spinner />) : 
                        (dishes.map((dish, index)=>{
                            return(
                                <button key={index} onClick={()=>addToBasket(dish)} className="list-group-item d-flex align-items-center gap-3">
                                    <div className="d-flex align-items-center rounded-2 border border-2 overflow-hidden" style={{width: '100px', height: '100px '}}>
                                        <img src={dish.image} alt="image" className="w-100"/>
                                    </div>
                                    <div className="">
                                        {dish.title}
                                    </div>
                                    <div className="ms-auto me-5">
                                        {dish.price}KGS
                                    </div>
                                </button>
                            )
                    }))}
                </div>
                <div className="fixed-bottom bg-dark py-4">
                    <div className="container d-flex align-items-center gap-4">
                        <div className="text-light">
                            Order total: {total}KGS
                        </div>
                        <button className="btn btn-danger ms-auto" onClick={emptyTrash}>Empty trash</button>
                        <NavLink to='/order' className='btn btn-light'>Checkout</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dishes;