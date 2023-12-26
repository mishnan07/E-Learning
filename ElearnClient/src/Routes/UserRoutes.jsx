import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Login from '../Componets/User/Login';
import Main from '../Componets/User/Main';
import DropDown from '../Componets/User/DropDown';
import ChapterList from '../Componets/User/ChapterList';
import Content from '../Componets/User/Content';


const UserRoutes = () => {
    const isAuth = useSelector((state) => state.ClientAuth.Token);

  return (
    <>
       <Routes>

     
      
<Route
    path="/profile"
    element={isAuth ? <Home /> : <Navigate to="/login" />}
  />

   <Route
    path="/register"
    element={isAuth ? <Navigate to="/" /> : <Register />}
  />
  <Route
    path="/login"
    element={isAuth ? <Navigate to="/" /> : <Login />}
  />

   <Route
    path="/*"
    element={<Main />}
  />

<Route
    path="/course"
    element={isAuth ? <ChapterList />: <Navigate to="/login" />
     }
  />
  
  <Route
    path="/content"
    element={isAuth ? <Content />: <Navigate to="/login" />
     }
  />
</Routes>
    </>
  )
}

export default UserRoutes
