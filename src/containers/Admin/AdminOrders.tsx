import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOneOrder, fetchOrders } from "../../store/dishesThunks";
import { selectCartDishesFromOrders, selectCartOrders } from "../../store/cartSlice";

const AdminOrders = ()=>{

    const dispatch = useAppDispatch();

    const orders = useAppSelector(selectCartOrders);
    const dishesFromOrders = useAppSelector(selectCartDishesFromOrders);

    
    useEffect(()=>{
        dispatch(fetchOrders());
    },[dispatch])
    
    useEffect(()=>{
        orders.map((order)=>{
            dispatch(fetchOneOrder(order))
        })
        console.log(dishesFromOrders);
    },[orders])

    return(
        <>
            <div className="container">
                <h3>
                    Orders
                </h3>
            </div>
        </>
    )
}

export default AdminOrders;