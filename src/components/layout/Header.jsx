import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {IoTicket} from 'react-icons/io5'
import axios from 'axios';
import {GiHamburgerMenu} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'

const Header = () => {
  const navigate = useNavigate();
  const [toogle, setToggle] = useState(false)

    const handleLogOut = (e) => {
        e.preventDefault();
        axios.post("/api/logout").then((res) => {
            if (res.data.status === 200) {
                localStorage.removeItem("auth-token");
                localStorage.removeItem("auth_name");
                localStorage.removeItem("auth_id");

            }
            navigate('/');
        });
    };
  return (
          <nav className="container relative mx-auto p-6">
      <div className="flex items-center justify-between space-x-20 my-6">
        <div className="z-30">
          <div className='text-2xl flex'>
            <IoTicket />
            <NavLink to='/'>newTicket</NavLink>
          </div>
          {/* <img src="images/logo-bookmark.svg" alt="" id="logo" /> */}
        </div>

        <div
          className="hidden items-center space-x-10 uppercase text-grayishBlue md:flex"
        >
          <NavLink to="/" className="tracking-widest hover:text-indigo-900"
            >Home</NavLink>
          
          <a href="#services" className="tracking-widest hover:text-indigo-900"
            >Serivces</a
          >
          <a href="#pricing" className="tracking-widest hover:text-indigo-900">Pricing</a>
          {!localStorage.getItem('auth-token') ?
           <div>
            <a
            href="/login"
            className="px-8 py-2 text-white bg-indigo-900 border-2 border-indigo-900 rounded-lg shadow-md  hover:bg-indigo-700"
            >Login</a>
           </div>
            :
           <div className='space-x-4'>
             <NavLink to={`/ticket/user/${localStorage.getItem('auth_id')}`} className="tracking-widest hover:text-indigo-900"
            >Tickets</NavLink>
            <NavLink
            to="/"
            onClick={handleLogOut}
            className="px-8 py-2 text-white bg-indigo-900 border-2 border-indigo-900 rounded-lg shadow-md  hover:bg-indigo-700"
            >Logout</NavLink>
           </div>
            }
        </div>
        <h1
          id="menu-btn"
          className="z-30 block md:hidden focus:outline-none hamburger"
        >
          {!toogle ?<GiHamburgerMenu onClick={() => setToggle(!toogle)}/>:<ImCross onClick={() => setToggle(!toogle)}/>
}
        </h1>
      </div>
      <div
        id="menu"
        className={`fixed inset-0 z-20 lg:hidden ${toogle?'':'hidden'} flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-black`}
      >
        <div className="w-full py-3 text-center">
          <NavLink to='/' className="block hover:text-indigo-900">Home</NavLink>
        </div>
        <div className="w-full py-3 text-center">
          <NavLink to='/' className="block hover:text-indigo-900">Services</NavLink>
        </div>
        <div className="w-full py-3 text-center">
          <NavLink to="/" className="block hover:text-indigo-900">Pricing</NavLink>
        </div>
        <div className="w-full py-3 text-center">
        {!localStorage.getItem('auth-token') ?
           <div>
            <a
            href="/login"
            className="px-8 py-2 text-white bg-indigo-900 border-2 border-indigo-900 rounded-lg shadow-md  hover:bg-indigo-700"
            >Login</a>
           </div>
            :
           <div className='lg:space-x-4'>
            <div className='mb-8'>
            <NavLink to={`/ticket/user/${localStorage.getItem('auth_id')}`} className="tracking-widest hover:text-indigo-900"
            >Tickets</NavLink>
            </div>
           <div>
           <NavLink
            to="/"
            onClick={handleLogOut}
            className="px-8 py-2 text-white bg-indigo-900 border-2 border-indigo-900 rounded-lg shadow-md  hover:bg-indigo-700"
            >Logout</NavLink>
           </div>
           </div>
            }
        </div>
        </div>
    </nav>

  )
}

export default Header