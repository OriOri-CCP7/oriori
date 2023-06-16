import React from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, HeartIcon, FireIcon, MagnifyingGlassIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='nav'>
      <ul>
        <li className='Home'
          style={location.pathname === '/home' ? {background : '#ffe4e1'} : {}}>
          <HomeIcon 
            className='nav__icon home' 
            onClick={() => {
              navigate('/home');
            }}/>
        </li>

        <li className='Heart'
          style={location.pathname === '/favorite' ? {background : '#ffe4e1'} : {}}>
          <HeartIcon 
            className='nav__icon bkmarks'
            onClick={() => {
              navigate('/bookmarks');
            }}/>
        </li>

        <li className='Reviews'
          style={location.pathname === '/reviews' ? {background : '#ffe4e1'} : {}}>
          <HandThumbUpIcon
            className='nav__icon review'
            onClick={() => {
              navigate('/reviews');
            }}/>
        </li>

        <li className='Popular'
          style={location.pathname === '/popular' ? {background : '#ffe4e1'} : {}}>
          <FireIcon 
            className='nav__icon pop' 
            onClick={() => {
              navigate('/popular');
            }} />
        </li>

        <li className='Search'
          style={location.pathname === '/search' ? {background : '#ffe4e1'} : {}}>
          <MagnifyingGlassIcon
            className='nav__icon search'
            onClick={() => {
              navigate('/search');
            }}/>
        </li>
      </ul>
    </div>
  )
}

export default Navbar