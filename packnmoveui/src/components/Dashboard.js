import { Link } from "react-router-dom";
import React from 'react'

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-ccdaaf bg-no-repeat">
        <div className='flex-1 text-center'>
            <section className='m-2 p-2 font-titillium-web font-semibold'>
              We have the fastest solution to all your house related problems
            </section>
            <Link to="/quotation">
              <button className='border-black-100 bg-gray-600 box-border rounded-tr-lg rounded-br-lg rounded-bl-lg text-white px-8 py-4 font-semibold'>
                Get Quotation
              </button>
            </Link>
        </div>
        <div className='flex-1 text-center'>
            <div className='min-h-screen mt-20 bg-dashboard bg-no-repeat'>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;