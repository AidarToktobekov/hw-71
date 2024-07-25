import { NavLink } from "react-router-dom";

interface Props{
    title: string;
    image: string;
    price: number;
}

const Dish:React.FC<Props> = ({title, image, price})=>{
    return(
        <>
            <div className="list-group-item d-flex align-items-center gap-3">
                <div className="d-flex align-items-center rounded-2 border border-2" style={{width: '100px', height: '100px '}}>
                    <img src={image} alt="image" className="w-100"/>
                </div>
                <div className="">
                    {title}
                </div>
                <div className="ms-auto me-5">
                    {price}KGS
                </div>
                <NavLink to='' className="btn btn-primary">
                    Edit
                </NavLink>
                <button className="btn btn-danger">Delete</button>
            </div>
        </>
    )
}

export default Dish;