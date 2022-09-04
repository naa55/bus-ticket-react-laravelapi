import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import {Outlet} from 'react-router-dom'

export default class Guest extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className=''>
            <Outlet/>
        </div>
        <Footer/>
      </div>
    )
  }
}
