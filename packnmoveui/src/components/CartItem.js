import React from 'react'
import { useSelector } from 'react-redux';
import { removePlanFromCart } from '../auth/auth';
import { getUser, updateCart } from '../states/slices/userSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({plan}) => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    const removeItem = (planId, event) => {
        event.preventDefault();

        const payload = {
            userId: user.userId,
            planId: planId
        }

        removePlanFromCart(payload).then(response => {
            const cart = response.data;
            dispatch(updateCart(cart));
        }).catch(error => {
            console.log(error);
        })
    }

  return (
    <tbody className='border-b p-2'>
        <tr className='border-b'>
        <td className="p-2 border-r">
            {plan.planName}
            <button type="button" className="ml-2 pl-4 pr-4 shadow-md rounded bg-red-400 border-black border-2" onClick={(event) => removeItem(plan.planId, event)}>-</button>
        </td> 
        <td className="p-2 text-right">${plan.planPrice}</td>
        </tr>
    </tbody>
  )
}

export default CartItem