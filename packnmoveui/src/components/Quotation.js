import React from 'react'
import { Link } from "react-router-dom";
import HorizontalScrollCards from './HorizontalScrollCards'

const Quotation = () => {

  return (
    <div className='p-2 min-h-screen'>
      <HorizontalScrollCards />  
      <div className='container flex shadow-lg bg-white p-5 mx-auto my-16'>
        <div className='flex-grow'>
          <p className='text-lg font-titillium-web m-2 p-2'>Please select your plan to proceed</p>
        </div>
        <div className='text-end m-2 p-2'>
          <Link to="/checkout" ><button type="button" className="text-white bg-blue-700 hover:ring-4 hover:ring-blue-300 font-medium rounded-lg text-lg mr-5 px-5 py-2.5">Checkout</button></Link>
        </div>
        
      </div>
    </div>
    
      
  )
}

export default Quotation