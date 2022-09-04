import React from 'react'
import { Link } from 'react-router-dom'
import Morning1 from '../../assets/morning-1.jpg'
import Evening2 from '../../assets/evening-2.jpg'
import Evening1 from '../../assets/evening-1.jpg'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';
import {hero} from '../../data';
import '../../slider.css';
const myComponentStyle = {
    // backgroundImage: `url(${Background})`

 }
 const imgs = [
    Morning1, Evening1, Evening2
 ]
const Hero = () => {
  return (
    <section id="hero">
    <div
      className="container flex flex-col-reverse mx-auto p-6 lg:flex-row lg:mb-0"
    >
      <div className="flex flex-col space-y-10 lg:mt-16 lg:w-1/2 md:mt-8">
        <h1
          className="text-3xl font-semibold text-center lg:text-6xl lg:text-left"
        >
          A Bus Ticket Site
        </h1>
        <p
          className="max-w-md mx-auto text-lg text-center text-gray-400 lg:text-2xl lg:text-left lg:mt-0 lg:mx-0"
        >
          A clean and simple interface to buy your travel ticket on any date
          free.
        </p>

        <div
          className="flex items-center justify-center w-full space-x-4 lg:justify-start"
        >
          <a
            href="/ticket"
            className="p-4 text-sm font-semibold text-white bg-indigo-900 rounded shadow-md border-2 border-softBlue md:text-base hover:bg-indigo-700"
            >Buy Ticket</a
          >
          {
            !localStorage.getItem('auth-token') && <a
            href="/register"
            className="p-4 text-sm font-semibold text-white bg-indigo-900 rounded shadow-md border-2 border-gray-300 md:text-base hover:bg-indigo-700"
            >Sign Up</a
          >
          }
        </div>
      </div>

      <div className="lg:relative lg:mx-0 lg:mb-0 lg:w-1/2">
        <div className="bg-hero"></div>
        <div className=''>
        <Swiper className='testimonialSlider' modules={[Navigation, Autoplay]} navigation={true} autoplay={true}>
            {imgs.map((item, index) =>{
                return <SwiperSlide key={index}>
                    <div className='flex flex-col min-h-[250px]'>
                        <div >
                            <img className='rounded-lg' src={item} alt=""/>
                        </div>
                    </div>
                </SwiperSlide>
            } )}
        </Swiper>
        </div>
       
      </div>
    </div>
     </section>
  )
}

export default Hero
