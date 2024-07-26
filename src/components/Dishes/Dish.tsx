import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteDishes, fetchDishes } from "../../store/dishesThunks";
import { selectDeleteDishLoading } from "../../store/dishesSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props{
    title: string;
    image: string;
    price: string;
    id: string;
}

const Dish:React.FC<Props> = ({title, image, price, id})=>{

    const dispatch = useAppDispatch()
    const deleteLoading = useAppSelector(selectDeleteDishLoading)

    const onDelete = async () => {
        await dispatch(deleteDishes(id));
        await dispatch(fetchDishes());
      };

    return(
        <>
            <div className="list-group-item d-flex align-items-center gap-3">
                <div className="d-flex align-items-center rounded-2 border border-2 overflow-hidden" style={{width: '100px', height: '100px '}}>
                    <img src={image} alt="image" className="w-100"/>
                </div>
                <div className="">
                    {title}
                </div>
                <div className="ms-auto me-5">
                    {price}KGS
                </div>
                <NavLink to={'edit/' + id} className="btn btn-primary">
                    Edit
                </NavLink>
                <button className="btn btn-danger" onClick={onDelete} disabled={deleteLoading ? deleteLoading === id : false}>
              {deleteLoading && deleteLoading === id && (<ButtonSpinner />)}Delete</button>
            </div>
        </>
    )
}

export default Dish;