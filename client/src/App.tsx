import React from 'react';
import Testpage from '../src/pages/TestsPage';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/new-password' element={<PasswordReset/>}></Route>
        <Route path='/favorite' element={<Favorite/>}></Route>
        <Route path='/popular' element={<Popular/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/testpage' element={<Testpage />}></Route>
      </Routes>
      <Navbar/>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
