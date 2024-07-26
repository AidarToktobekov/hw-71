import { Outlet, Route, Routes, useParams } from "react-router-dom"
import AdminLayout from "./components/Admin/AdminLayout"
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminOrders from "./containers/Admin/AdminOrders"
import AdminDishes from "./containers/Admin/AdminDishes"
import Form from "./components/Form/Form"
import { ApiDish } from "./types"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { createDish, fetchDishes, fetchOneDish, updateDish } from "./store/dishesThunks"
import { selectOneDish } from "./store/dishesSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import EditDish from "./containers/Admin/EditDish"
import Dishes from "./containers/ClientPage/Dishes"
import Order from "./containers/ClientPage/Order"

const App = ()=> {
  
  const dispatch = useAppDispatch();

  const addDish = (dish: ApiDish)=>{
    dispatch(createDish(dish));
    dispatch(fetchDishes());
  }


  return (
    <>

        <Routes>
            <Route path="/" element={
              <Dishes></Dishes>
            }/> 
            <Route path="/order" element={
              <Order/>
            }/> 
            <Route path="/admin" element={<AdminLayout></AdminLayout>}> 
              <Route path="orders" element={
                <AdminOrders></AdminOrders>
              }/>
              <Route path="dishes" element={
                <AdminDishes></AdminDishes>
              }/>
              <Route path="dishes/edit/:id" element={
                <EditDish/>
              }/>
              <Route path="dishes/add-dish" element={
                <Form title='Add new Dish' onSubmit={addDish}></Form>
              }/>
            </Route>
        </Routes>
    </>
  )
}

export default App
