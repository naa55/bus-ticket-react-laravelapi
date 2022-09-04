import React from 'react'
import Sun from '../../assets/Sun.svg'
import Dream from '../../assets/Dream.svg'
import Bag from '../../assets/geanta07.png'
import Title from '../layout/Title'
import {Link} from 'react-router-dom'
const Services = () => {
  return (
    <div id="services" className="py-32">
        <Title title='Services'/>
      <div
        className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 md:px-6 md:space-y-0 md:space-x-7 md:flex-row"
      >
        <div
          className="flex flex-col w-full py-6 space-y-4 text-center rounded-lg shadow-lg md:w-1/3"
        >
          <div className="flex justify-center">
            <img src={Sun} alt="" className='w-32' />
          </div>
          <h5 className="pt-6 text-xl font-bold">Morning Rides</h5>
          <p className="text-gray-400">Early Morning Rides</p>

          <div className="bg-dots bg-repeat-x px-6 pt-6 capitalize">
          <a
              href="/ticket"
              className="block w-full py-3 text-white duration-200 border-2 rounded-lg  hover:text-softBlue hover:bg-indigo-500 bg-indigo-700"
              >Buy a Ticket</a>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div
            className="flex flex-col w-full py-6 space-y-4 text-center rounded-lg shadow-lg md:mt-8"
          >
            <div className="flex justify-center">
              <img src={Dream} alt="" className='w-32' />
            </div>
            <h5 className="pt-6 text-xl font-bold">Evening Rides</h5>
            <p className="text-gray-400">Early Evening Rides</p>
            <p className='text-green-500'>Coming Soon</p>

            <div className="bg-dots bg-repeat-x px-6 pt-6 capitalize">
            <button
              type='button'
              disabled={true}
              className="block w-full py-3 text-white duration-200 border-2 rounded-lg  hover:text-softBlue hover:bg-indigo-500 bg-indigo-700"
              >Buy a Ticket</button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div
            className="flex flex-col w-full py-6 space-y-4 text-center rounded-lg shadow-lg md:mt-16"
          >
            <div className="flex justify-center">
              <img src={Bag} alt="" className='w-32' />
            </div>
            <h5 className="pt-6 text-xl font-bold">Free Bag Loading</h5>
            <p className="text-gray-400">Free Loading for two bags</p>
            <div className="bg-dots bg-repeat-x px-6 pt-6 capitalize">
            <a
              href="/ticket"
              className="block w-full py-3 text-white duration-200 border-2 rounded-lg  hover:text-softBlue hover:bg-indigo-500 bg-indigo-700"
              >Buy a Ticket</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services