import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Guest from './components/layout/Guest';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import TicketCreate from './components/ticket/Create';
import Admin from './components/layout/Admin';
import TicketIndex from './components/ticket/Index';
import Ticket from './components/pages/Ticket';
import Tickets from './components/pages/Tickets';
// axios.defaults.baseURL='http://localhost:8000/';
axios.defaults.baseURL='https://limitless-meadow-06290.herokuapp.com/';

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth-token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});
function App() {
  return (
    <BrowserRouter>
      <Routes>
              <Route path='/' element={<Home/>}/>
          {/* <Route element={<Guest />}>
                {localStorage.getItem("auth-token") ? (
                    <Route path="/about" element={<Home />} />
                ) : (
                    <Route path="/about" element={<Navigate to="/login" />} />
                )}
            </Route> */}
            <Route element={<Guest />}>
                {localStorage.getItem("auth-token") ? (
                    <Route path="/login" element={<Navigate to="/" />} />
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
            </Route>
            <Route element={<Guest />}>
                {localStorage.getItem("auth-token") ? (
                    <Route path="/regsiter" element={<Navigate to="/" />} />
                ) : (
                    <Route path="/register" element={<Register />} />
                )}
            </Route>
            <Route element={<Guest/>}>
                <Route>
                    {localStorage.getItem("auth-token") ? (
                    <Route path="/ticket" element={<TicketCreate />} />
                ) : (
                    <Route path="/ticket" element={<Navigate to="/login" />} />
                )}
                </Route>
                <Route>
                    <Route path='/ticket/user/:id' element={<Ticket/>}/>
                </Route>
            </Route>
            <Route element={<Admin/>}>
                <Route>
                    <Route path='/admin/ticket' element={<TicketIndex/>}/>
                </Route>
            </Route>
            <Route element={<Guest/>}>
                 <Route path="/tickets" element={<Tickets />} />
            </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
