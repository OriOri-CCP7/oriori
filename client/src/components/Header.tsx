import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import SettingsButton from './SettingsButton';
import '../styles/Header.css';

type Props = {
  mainText: string,
  secondaryText?: string
};

const Header: React.FC<Props> = ({ mainText, secondaryText }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={ 'header' }>
      <div className='header__top-container'>
        <img src='/oriori-logo.svg' className='header__logo' alt='OriOri Logo'/>
        { location.pathname === '/home' && <SettingsButton/> }
        {
          location.pathname === '/'
          && <div className='circular-icon'>
              <UserCircleIcon 
                className='login-icon'
                onClick={() => {
                  navigate('/login');
                }}/>
            </div>
        }
      </div>
      { mainText && <h1 className='header__h1'> { mainText } </h1> }
      { secondaryText && <h2 className='header__h2'> { secondaryText } </h2> }
    </header>
  );
};

export default Header;
