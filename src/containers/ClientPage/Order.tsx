import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addOrder, deleteCart, selectCartDishes, selectCartOrder } from "../../store/cartSlice";
import { createOrder } from "../../store/dishesThunks";
import { Orders } from "../../types";
import { useEffect } from "react";

const Order = ()=>{

    const navigate = useNavigate();
    const carts = useAppSelector(selectCartDishes);
    const order = useAppSelector(selectCartOrder);
    const dispatch = useAppDispatch();
    
    const onDelete = (index: number)=>{
        dispatch(deleteCart(index))
    }

    let message = null;
    if (carts.length < 1) {
        message =(
            <div className="fs-3 text-center my-2">
                Cart is empty
            </div>
        )
    }

    let total = carts.reduce((sum, carts) => {
        return sum + carts.amount * Number(carts.dish.price);
    }, 0);

    if (total !== 0) {
        total += 150;
    }
    useEffect(()=>{
        for (let i = 0; i < carts.length; i++) {    
            const order:Orders = {
                id: carts[i].dish.id,
                amount: carts[i].amount,
            }
            dispatch(addOrder(order))
        }
    },[carts])

    const setOrder = ()=>{
        dispatch(createOrder(order));
        navigate('/');
        alert('Your order has been accepted, wait for delivery!');
    }

    return(
        <> 
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h3 className="text-light">
                        Your order  
                    </h3>
                </div>
            </nav>
            <div className="container">
                <div className="list-group mt-4">
                    {carts.map((cart, index)=>{
                        return(
                            <div key={index} className="list-group-item d-flex align-items-center gap-5">
                                <div>
                                    {cart.dish.title} x {cart.amount}
                                </div>
                                <div className="ms-auto">
                                    {Number(cart.dish.price) * cart.amount}KGS
                                </div>
                                <button onClick={()=>onDelete(index)} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                    )})}
                    {message}
                    <div className="container text-center mt-3">
                        <div>Delivery: 150KGS</div>
                        <div className="mb-3">Total: {total}KGS</div>
                        <button className="btn btn-primary me-3 " onClick={setOrder} disabled={carts.length < 1}>Order</button>
                        <NavLink to='/' className="btn btn-danger">Cancel</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;