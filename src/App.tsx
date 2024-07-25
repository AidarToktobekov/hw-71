import { Outlet, Route, Routes } from "react-router-dom"
import AdminLayout from "./components/Admin/AdminLayout"
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminOrders from "./containers/Admin/AdminOrders"
import AdminDishes from "./containers/Admin/AdminDishes"

const App = ()=> {

  return (
    <>

        <Routes>
            <Route path="/" element={
              <>
                Home
              </>
            }> 
            </Route>
            <Route path="/admin" element={<AdminLayout></AdminLayout>}> 
              <Route path="orders" element={
                <AdminOrders></AdminOrders>
              }/>
              <Route path="dishes" element={
                <AdminDishes></AdminDishes>
              }/>
              <Route path="dishes/add-dish" element={
                <>Form</>
              }/>
            </Route>
        </Routes>
    </>
  )
}

export default App
