import React from 'react';
import { useLocation } from 'react-router-dom';
import SettingsButton from './SettingsButton';
import '../styles/Header.css';

type Props = {
  mainText: string,
  secondaryText?: string
};

const Header: React.FC<Props> = ({ mainText, secondaryText }: Props) => {
  const location = useLocation();
  return (
    <header className={ 'header' }>
      <div className='header__top-container'>
        <img src='/oriori-logo.svg' className='header__logo' alt='OriOri Logo'/>
        { location.pathname === '/home' && <SettingsButton/> }
      </div>
      { mainText && <h1 className='header__h1'> { mainText } </h1> }
      { secondaryText && <h2 className='header__h2'> { secondaryText } </h2> }
    </header>
  );
};

export default Header;
