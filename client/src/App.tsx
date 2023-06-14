import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { FavContextProvider } from './context/FavContext';
import { ReviewContextProvider } from './context/ReviewContext';
import ProtectedRoute from './context/ProtectedRoute'
import Favorite from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import NewReview from './pages/NewReview';
import Onboarding from './pages/Onboarding';
import PasswordReset from './pages/PasswordReset';
import Popular from './pages/Popular';
import Reviews from './pages/Reviews';
import Search from './pages/Search';
import Settings from './pages/Settings';
import Signup from './pages/Signup';

import './App.css';

function App() {
  
  return (
    <div className="App">
      <AuthContextProvider>
        <FavContextProvider>
          <ReviewContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/new-password' element={<PasswordReset/>}></Route>
                
                <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                <Route path='/favorites' element={<ProtectedRoute><Favorite/></ProtectedRoute>}></Route>
                <Route path='/popular' element={<ProtectedRoute><Popular/></ProtectedRoute>}></Route>
                <Route path='/reviews' element={<ProtectedRoute><Reviews/></ProtectedRoute>}></Route>
                <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}></Route>
                <Route path='/settings' element={<ProtectedRoute><Settings/></ProtectedRoute>}></Route>
                <Route path='/onboarding' element={<ProtectedRoute><Onboarding/></ProtectedRoute>}></Route>
                <Route path='/:productId/new-review' element={<ProtectedRoute><NewReview/></ProtectedRoute>}></Route>
              </Routes>
            </BrowserRouter>
          </ReviewContextProvider>
        </FavContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
