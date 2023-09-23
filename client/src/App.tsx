import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { BkmarkContextProvider } from './context/BkmarkContext';
import { LogContextProvider } from './context/LogContext';
import AdminRoute from './context/AdminRoute';
import ProtectedRoute from './context/ProtectedRoute'
import AdminAddProduct from './pages/AdminAddProduct';
import AdminDeleteProduct from './pages/AdminDeleteProduct';
import Bookmarks from './pages/Bookmarks';
import HomeUser from './pages/HomeUser';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import PasswordReset from './pages/PasswordReset';
import Popular from './pages/Popular';
import Logs from './pages/Logs';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

import './App.css';

function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
        <BkmarkContextProvider>
          <LogContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/new-password' element={<PasswordReset/>}></Route>
                
                <Route path='/home' element={<ProtectedRoute><HomeUser/></ProtectedRoute>}></Route>
                <Route path='/bookmarks' element={<ProtectedRoute><Bookmarks/></ProtectedRoute>}></Route>
                <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}></Route>
                <Route path='/logs' element={<ProtectedRoute><Logs/></ProtectedRoute>}></Route>
                <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}></Route>
                <Route path='/settings' element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
                <Route path='/onboarding' element={<ProtectedRoute><Onboarding/></ProtectedRoute>}></Route>

                <Route path='/admin-addProduct' element={<AdminRoute><AdminAddProduct/></AdminRoute>}></Route>
                <Route path='/admin-deleteProduct' element={<AdminRoute><AdminDeleteProduct/></AdminRoute>}></Route>
              </Routes>
            </BrowserRouter>
          </LogContextProvider>
        </BkmarkContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
