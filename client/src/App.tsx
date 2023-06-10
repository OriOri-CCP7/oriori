import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Favorite from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import PasswordReset from './pages/PasswordReset';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

import './App.css';


function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/favorite' element={<Favorite/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/new-password' element={<PasswordReset/>}></Route>
        <Route path='/onboarding' element={<Onboarding/>}></Route>
        <Route path='/popular' element={<Popular/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/settings' element={<Settings />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
