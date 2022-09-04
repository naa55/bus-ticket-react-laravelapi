import React from 'react'
import Title from '../layout/Title'
import {Link} from 'react-router-dom'

const Pricing = () => {
  return (
   <div className='mb-12' id='pricing'>
    <div className=''>
    <Title title='Pricing'/>
    </div>
     <div className="relative flex flex-col items-center justify-center max-w-6xl mx-auto space-y-10 px-10 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <div
          className="flex flex-col w-full py-6 space-y-4 text-center rounded-lg shadow-lg md:w-1/3 border border-indigo-700"
        >
          <div className="flex justify-center">
            {/* <img src={Sun} alt="" className='w-32' /> */}
          </div>
          <h5 className="pt-6 text-xl font-bold">Morning Ride</h5>
          <p className="text-2xl">$ 10</p>


          <div className="bg-dots bg-repeat-x px-6 pt-6 capitalize">
          <a
              href="/ticket"
              className="block w-full py-3 text-white duration-200 border-2 rounded-lg  hover:text-softBlue hover:bg-indigo-500 bg-indigo-700"
              >Buy a Ticket</a>
          </div>
        </div>
        <div
          className="flex flex-col w-full py-6 space-y-4 text-center rounded-lg shadow-lg md:w-1/3  border border-indigo-700"
        >
          <div className="flex justify-center">
          </div>
          <h5 className="pt-6 text-xl font-bold">Evening Rides</h5>
          <p className="text-2xl">$ 20</p>
          <p className='text-green-500'>Coming Soon</p>
          <div className="bg-dots bg-repeat-x px-6 pt-6 capitalize">
          <button
              disabled={true}
              className="block w-full py-3 text-white duration-200 border-2 rounded-lg  hover:text-softBlue hover:bg-indigo-500 bg-indigo-700"
              >Buy a Ticket</button>
          </div>
        </div>
    </div>
   </div>
  )
}

export default Pricing