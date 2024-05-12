import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateCart} from '../states/slices/userSlice';
import { addPlanToCart, removePlanFromCart } from '../auth/auth';

const Cards = ({product}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const isAlreadyInCart = (plans, planId) => {
    const filteredPlans = plans.filter(plan => {
      return plan.planId === planId
    })
    return filteredPlans.length > 0
  }


  const handleCartAction = (planId, event) => {
    event.preventDefault();

    var selected = isAlreadyInCart(user.cart.plans, planId);

    if(selected) {
      selected = false;
    }
    else {
      selected = true;
    }
    const payload = {
      userId: user.userId,
      planId: planId
    }
    if(selected) {
      addPlanToCart(payload).then(response => {
        const cart = response.data
        dispatch(updateCart(cart));
      }).catch(error => {
        console.log(error);
      });
    }
    else {
      removePlanFromCart(payload).then(response => {
        const cart = response.data;
        dispatch(updateCart(cart));
      }).catch(error => {
        console.log(error);
      })
    }
    
  }

  return (
    <div className="inline-block px-3">
        <div className="rounded-lg items-stretch h-full shadow-md min-h-72 min-w-72 max-w-72 bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-2 m-2 text-center">
            <div className='min-h-64'>
              <p className='text-lg font-bold '>{product.planName}</p>
              <img
                  src={product.imagePath}
                  width={125}
                  height={125}
                  className='mx-auto mb-6 min-h-fit'
                  alt='product'
              />
              <p className='m-2 p-2 font-titillium-web'>{product.planDescription}</p>
            </div>
            <button type="button" name="product" className="text-white bg-blue-700 hover:ring-4 hover:ring-blue-300 active:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-colors duration-200" onClick={(event) => handleCartAction(product.planId, event)}>{product.planPrice}</button>
        </div>
    </div>
  )
}

export default Cards