import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import request from './api/request';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import ListHotels from './pages/ListHotel';
import Loading from './components/Loading';
import { PrivatePage } from './components/RulePage';
import CreateHotel from './pages/CreateHotel';
import Error from './components/Error/Error';
import CreateFacilities from './pages/CreateFacilities';
import ListUser from './pages/ListUser';
import CreateTicket from './pages/CreateTicket';
import HotelDetail from './pages/HotelDetail';
import CreateRoom from './pages/CreateRoom';
import RoomDetail from './components/RoomDetail';
import ListTicket from './pages/ListTicket';

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
          <Route path='/' element={<ListHotels />} />
          <Route path='/listUser' element={<ListUser/>} />
          <Route path='/hotels' element={<ListHotels />} />
          <Route path='/hotels/:hotelId' element={<HotelDetail />} />
          <Route path='/hotels/:hotelId/createRoom' element={<CreateRoom />} />
          <Route path='/roomType/:roomTypeId' element={<RoomDetail />} />
          <Route path='/hotels/createHotel' element={<CreateHotel />} />
          <Route path='/createTicket' element={ <CreateTicket />} />
          <Route path='/createFacility' element={<CreateFacilities />} />
          <Route path='/listTicket' element={<ListTicket />} />
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
