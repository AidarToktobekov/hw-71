import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFetchOneDishLoading, selectOneDish, selectUpdateDishLoading } from "../../store/dishesSlice";
import { ApiDish } from "../../types";
import { fetchOneDish, updateDish } from "../../store/dishesThunks";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";
import Form from "../../components/Form/Form";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const EditDish = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(selectFetchOneDishLoading);
    const state = useSelector((state:RootState) => state.dishes);

    const isUpdating = useAppSelector(selectUpdateDishLoading);
    const dish = useAppSelector(selectOneDish);
  
    const onSubmit = async (apiDish: ApiDish) => {
      try {
        await dispatch(updateDish({ id, apiDish })).unwrap();
        toast.success('Dish updated!');
      } catch (e) {
        toast.error('Could not update dish!');
      }
    };
  
    useEffect(() => {
      dispatch(fetchOneDish(id));
      console.log(state);
      
    }, [dispatch, id]);
    

    return (
        <>
          {isFetching && <Spinner />}
          {dish && (
            <Form
              onSubmit={onSubmit}
              existingDish={dish}
              isLoading={isUpdating}
              title="Edit Dish"
            />
          )}
        </>
    );
  };
  
  export default EditDish;
  