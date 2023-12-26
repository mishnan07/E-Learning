import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from '../Componets/Admin/Sidebar';
import { useSelector } from 'react-redux';
import Login from '../Componets/User/Login';

const AdminRoutes = () => {
  const isAuth = useSelector((state) => state.AdminAuth.Token);
  const ID = useSelector((state) => state.AdminAuth.Id);

  return (
    <>
    <Routes>

  
   
<Route
 path="/home"
 element={isAuth ?<Sidebar /> : <Navigate to="/login" />}
/>
<Route
    path="/login"
    element={isAuth ? <Navigate to="/login" /> : <Login />}
  />



</Routes>
 </>
  )
}

export default AdminRoutes
