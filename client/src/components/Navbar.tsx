import { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, HeartIcon, FireIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


function Navbar() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('Home');

  const handleCurrentView = (currentView: string) => {
    setCurrentView(currentView);
  }

  return (
    <div className='nav'>
      <ul>
            <li className='Home' 
                style={currentView === 'Home' ? {background : '#ffe4e1'} : {}}>
              <HomeIcon 
              className='home-icon' 
              onClick={() => {
                navigate('/home');
                handleCurrentView('Home');
              }}/>
            </li>

            <li className='Heart'
                style={currentView === 'Heart' ? {background : '#ffe4e1'} : {}}>
              <HeartIcon 
              className='heart-icon'
              onClick={() => {
                navigate('/favorite');
                handleCurrentView('Heart');
              }}/>
            </li>

            <li className='Popular'
                style={currentView === 'Popular' ? {background : '#ffe4e1'} : {}}>
              <FireIcon 
              className='popular-icon' 
              onClick={() => {
                navigate('/popular');
                handleCurrentView('Popular');
              }} />
            </li>

            <li className='Search'
                style={currentView === 'Search' ? {background : '#ffe4e1'} : {}}>
              <MagnifyingGlassIcon
              className='search-icon'
              onClick={() => {
                navigate('/search');
                handleCurrentView('Search');
              }}/>
            </li>
        </ul>
    </div>
  )
}

export default Navbar