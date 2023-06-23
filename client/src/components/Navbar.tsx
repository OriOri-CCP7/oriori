import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BookmarkIcon, FireIcon, MagnifyingGlassIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='nav'>
      <ul>
        <li className='Home'
          style={location.pathname === '/home' ? {background : '#ffe4e1'} : {}}>
          <HomeIcon
            {...location.pathname === '/home' ? {className:'nav__icon home'} : {className:'unselected'}} 
            onClick={() => {
              navigate('/home');
            }}/>
        </li>

        <li className='Heart'
          style={location.pathname === '/bookmarks' ? {background : '#ffe4e1'} : {}}>
          <BookmarkIcon 
            {...location.pathname === '/bookmarks' ? {className:'nav__icon bkmark'} : {className:'unselected'}} 
            onClick={() => {
              navigate('/bookmarks');
            }}/>
        </li>

        <li className='Logs'
          style={location.pathname === '/logs' ? {background : '#ffe4e1'} : {}}>
          <CheckCircleIcon
            {...location.pathname === '/logs' ? {className:'nav__icon log'} : {className:'unselected'}} 
            onClick={() => {
              navigate('/logs');
            }}/>
        </li>

        <li className='Popular'
          style={location.pathname === '/popular' ? {background : '#ffe4e1'} : {}}>
          <FireIcon 
            {...location.pathname === '/popular' ? {className:'nav__icon pop'} : {className:'unselected'}}  
            onClick={() => {
              navigate('/popular');
            }} />
        </li>

        <li className='Search'
          style={location.pathname === '/search' ? {background : '#ffe4e1'} : {}}>
          <MagnifyingGlassIcon
            {...location.pathname === '/search' ? {className:'nav__icon search'} : {className:'unselected'}} 
            onClick={() => {
              navigate('/search');
            }}/>
        </li>
      </ul>
    </div>
  )
}

export default Navbar