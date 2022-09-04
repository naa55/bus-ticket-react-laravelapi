import React from 'react'
import Hero from '../home/Hero'
import Pricing from '../home/Pricing'
import Services from '../home/Services'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <Header/>
      <Hero/>
      <Services/>
      <Pricing/>
      <Footer/>
    </div>
  )
}

export default Home