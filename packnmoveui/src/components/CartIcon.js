import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getUser } from '../states/slices/userSlice';

const CartIcon = () => {
    const user = useSelector(getUser);

  return (
    <div className="relative inline-bloc p-2 pr-4 border-black border-r-2">
        <FaShoppingCart className="h-6 w-6 fill-current" />
          <div className="absolute top-0 right-0 h-5 w-5 mr-2 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
            {user.cart.plans.length}
          </div>
      </div>
  )
}

export default CartIcon;