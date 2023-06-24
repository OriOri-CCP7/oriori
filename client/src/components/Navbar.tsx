import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, BookmarkIcon, FireIcon, MagnifyingGlassIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='nav__container'>
      <ul className='nav__button-wrapper'>
        <li className='nav__button home'
          style={location.pathname === '/home' ? {background : '#ffe4e1'} : {}}>
          <HomeIcon
            {...location.pathname === '/home' ? {className:'nav__icon home'} : {className:'nav__icon unselected'}} 
            onClick={() => {
              navigate('/home');
            }}/>
        </li>

        <li className='nav__button bkmark'
          style={location.pathname === '/bookmarks' ? {background : '#ffe4e1'} : {}}>
          <BookmarkIcon 
            {...location.pathname === '/bookmarks' ? {className:'nav__icon bkmark'} : {className:'nav__icon unselected'}} 
            onClick={() => {
              navigate('/bookmarks');
            }}/>
        </li>

        <li className='nav__button log'
          style={location.pathname === '/logs' ? {background : '#ffe4e1'} : {}}>
          <CheckCircleIcon
            {...location.pathname === '/logs' ? {className:'nav__icon log'} : {className:'nav__icon unselected'}} 
            onClick={() => {
              navigate('/logs');
            }}/>
        </li>

        <li className='nav__button pop'
          style={location.pathname === '/popular' ? {background : '#ffe4e1'} : {}}>
          <FireIcon 
            {...location.pathname === '/popular' ? {className:'nav__icon pop'} : {className:'nav__icon unselected'}}  
            onClick={() => {
              navigate('/popular');
            }} />
        </li>

        <li className='nav__button search'
          style={location.pathname === '/search' ? {background : '#ffe4e1'} : {}}>
          <MagnifyingGlassIcon
            {...location.pathname === '/search' ? {className:'nav__icon search'} : {className:'nav__icon unselected'}} 
            onClick={() => {
              navigate('/search');
            }}/>
        </li>
      </ul>
    </div>
  )
}

export default Navbar