import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import request from './api/request';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import ListHotels from './pages/ListHotel';
import Loading from './components/Loading';
import { PrivatePage } from './components/RulePage';
import Error from './components/Error/Error';
import HotelDetail from './pages/HotelDetail';
import ListTicket from './pages/ListTicket';
import Home from './pages/Home';
import Order from './pages/Order';

export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle');

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('done');
      return;
    }
    try {
      const res = await request({
        url: '/auth/me',
        method: 'GET',
      })
      if (res.success) {
        setUser(res.data);
        setStatus('done');
      }
      else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }
  
  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (status === 'idle' || status === 'loading') return (<Loading />);

  if (status === 'error') return <div> <Error /> </div>;
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivatePage />}>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<ListHotels />} />
          <Route path='/hotels/:hotelId' element={<HotelDetail />} />
          <Route path='/listTicket' element={<ListTicket />} />
          <Route path='/order/:roomTypeId' element={<Order />}/>
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
