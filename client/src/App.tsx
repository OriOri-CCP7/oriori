import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Favorite from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

import  ProtectedRoute from './context/ProtectedRoute'

import './App.css';


function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/new-password' element={<ProtectedRoute><PasswordReset/></ProtectedRoute>}></Route>
        <Route path='/favorite' element={<ProtectedRoute><Favorite/></ProtectedRoute>}></Route>
        <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}></Route>
        <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>}></Route>
        <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>}></Route>
      </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
