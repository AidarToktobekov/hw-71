import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDishes } from "../../store/dishesThunks";
import { useEffect } from "react";
import { selectDishes, selectFetchDishesLoading } from "../../store/dishesSlice";
import Spinner from "../../components/Spinner/Spinner";
import Dish from "../../components/Dishes/Dish";

const AdminDishes = ()=>{

    const dispatch = useAppDispatch();
    const dishes = useAppSelector(selectDishes);
    const dishesLoading = useAppSelector(selectFetchDishesLoading); 

    useEffect(()=>{
        dispatch(fetchDishes())
        console.log(dishes);
    }, [])


    return(
        <>
            <div className="container ">
                <div className="d-flex py-3 justify-content-between">
                    <h2>Dishes</h2>
                    <NavLink to='add-dish' className='btn btn-dark'>Add new dish</NavLink>
                </div>
                <div className="list-group">
                    {dishesLoading ? ( <Spinner />) : 
                        (dishes.map((dish, index)=>{
                            return(
                                <Dish key={index} title={dish.title} price={dish.price} image={dish.image}></Dish>
                            )
                    }))}
                </div>
                
            </div>
        </>
    )
}

export default AdminDishes;