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
            className='nav__icon home' 
            onClick={() => {
              navigate('/home');
            }}/>
        </li>

        <li className='Heart'
          style={location.pathname === '/favorite' ? {background : '#ffe4e1'} : {}}>
          <BookmarkIcon 
            className='nav__icon bkmark'
            onClick={() => {
              navigate('/bookmarks');
            }}/>
        </li>

        <li className='Logs'
          style={location.pathname === '/logs' ? {background : '#ffe4e1'} : {}}>
          <CheckCircleIcon
            className='nav__icon log'
            onClick={() => {
              navigate('/logs');
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