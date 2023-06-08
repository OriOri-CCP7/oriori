import React from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, HeartIcon, FireIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='nav'>
      <ul>
            <li className='Home' 
                style={location.pathname === '/home' ? {background : '#ffe4e1'} : {}}>
              <HomeIcon 
                className='home-icon' 
                onClick={() => {
                  navigate('/home');
                }}/>
            </li>

            <li className='Heart'
                style={location.pathname === '/favorite' ? {background : '#ffe4e1'} : {}}>
              <HeartIcon 
                className='heart-icon'
                onClick={() => {
                  navigate('/favorite');
                }}/>
            </li>

            <li className='Popular'
                style={location.pathname === '/popular' ? {background : '#ffe4e1'} : {}}>
              <FireIcon 
                className='popular-icon' 
                onClick={() => {
                  navigate('/popular');
                }} />
            </li>

            <li className='Search'
                style={location.pathname === '/search' ? {background : '#ffe4e1'} : {}}>
              <MagnifyingGlassIcon
                className='search-icon'
                onClick={() => {
                  navigate('/search');
                }}/>
            </li>
        </ul>
    </div>
  )
}

export default Navbar