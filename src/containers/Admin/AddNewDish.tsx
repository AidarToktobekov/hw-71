import React from 'react';
import { ApiDish } from '../../types';

import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateDishLoading } from '../../store/dishesSlice';
import { createDish } from '../../store/dishesThunks';
import Form from '../../components/Form/Form';

const NewDish: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateDishLoading);

  const onSubmit = async (dish: ApiDish) => {
    try {
      await dispatch(createDish(dish)).unwrap();
      toast.success('Dish created');
    } catch (error) {
      toast.error('Could not create dish!');
    }
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <Form title='Add new Dish' onSubmit={onSubmit} isLoading={isCreating} />
      </div>
    </div>
  );
};

export default NewDish;