import { FormEvent, useState } from "react";
import { ApiDish } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props{
    title: string;
    onSubmit: (dish: ApiDish)=>void;
    existingDish?: ApiDish;
    isLoading?: boolean;
}

const Form:React.FC<Props> = ({title, onSubmit, existingDish})=>{
    const navigate = useNavigate();
    

    const emptyState: ApiDish = {
        title: '',
        image: '',
        price: '',
    };

    const initialState: ApiDish = existingDish
    ? { ...existingDish }
    : emptyState;

    const [dishMutation, setDishMutation] = useState<ApiDish>(initialState);

    const changeDish = (
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        setDishMutation((prev) => ({
          ...prev,
          [event.target.name]: String(event.target.value),
        }));
      };

    const formSubmit = (event: FormEvent)=>{
        event.preventDefault();
        onSubmit(dishMutation);
        navigate('/admin/dishes');
    }

    return(
        <>
            <div className="container">
                <h3 className="my-3">
                    {title}
                </h3>
                <form onSubmit={formSubmit}>
                    <div className="mb-3">
                        <input type="text" onChange={changeDish} value={dishMutation.title} name="title" className="form-control" required placeholder="Name of the dish" />
                    </div>
                    <div className="mb-3">
                        <input type="number" onChange={changeDish} value={dishMutation.price} name="price" className="form-control" required placeholder="Price" />
                    </div>
                    <div className="mb-3">
                        <input type="text" onChange={changeDish} value={dishMutation.image} name="image" className="form-control" required placeholder="Image" />
                    </div>
                    <button type="submit" className='btn btn-dark'>
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}

export default Form;