import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { SiPhonepe } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { SiAmazonpay } from "react-icons/si";
import { SiPaytm } from "react-icons/si";
import { CiCreditCard1 } from "react-icons/ci";
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { getUser } from '../states/slices/userSlice';

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const user = useSelector(getUser);

  useEffect(() => {
    setTotal(0);
    var tempTotal = 0
    user.cart.plans.forEach(plan => {
      tempTotal = tempTotal + parseFloat(plan.planPrice)
    });
    setTotal(tempTotal);
  }, [user.cart.plans])

  return (
    <div className='min-h-screen text-center font-titillium-web'>
      <h1 className='font-bold text-2xl m-2 text-gray-800'>CheckoutPage</h1>
      <div className='border-black'>
        <div className='m-5 p-2 bg-white-300 shadow-md'>
          <p className='text-xl mb-10 text-gray-700'>Payment Summary</p>
          <table className="w-full border border-gray-200">
            <thead className='w-full border-b p-2'>
              <tr>
                <th className="p-2 text-center border-r">Plan</th>
                <th className="p-2 text-right">Price</th>
              </tr>
            </thead>

            {
              user.cart.plans.length > 0 && user.cart.plans.map(plan=> {
                return <CartItem plan={plan}/>
              })
            }
            
            <tfoot className='p-2'>
              <tr>
                <td className="p-2 font-medium border-r">Total</td>
                <td className="p-2 text-right font-medium">${total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className='font-bold text-gray-700 text-2xl text-left m-2 p-2'>UPI Apps</p>
        <div className='flex rounded-lg mt-10 shadow-md bg-white justify-center'>
          <div className='p-2 m-2'>
            <Link to="/payment"><SiPhonepe className='inline-flex mx-2 cursor-pointer text-3xl text-gray-800' /></Link>
            <Link to="/payment"><FaGooglePay className='inline-flex mx-2 cursor-pointer text-3xl text-gray-800' /></Link>
            <Link to="/payment"><SiAmazonpay className='inline-flex mx-2 cursor-pointer text-3xl text-gray-800' /></Link>
            <Link to="/payment"><SiPaytm className='inline-flex mx-2 cursor-pointer text-3xl text-gray-800' /></Link>
          </div>
        </div>
        <p className='font-bold text-gray-700 text-2xl text-left m-2 p-2'>Credit Cards</p>
        <div className='flex rounded-lg mt-10 shadow-md bg-white justify-center'>
          <div className='p-2 m-2 flex-col'>
            <Link to="/payment">
              <p className='text-center ml-5'><CiCreditCard1 className='text-3xl' /></p>
              <p className='text-sm'>Credit Card</p>
            </Link>
            </div>
            <div className='p-2 m-2 flex-col'>
            <Link to="/payment">
            <p className='text-center ml-5'><CiCreditCard1 className='text-3xl' /></p>
              <p className='text-sm'>Debit Card</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;