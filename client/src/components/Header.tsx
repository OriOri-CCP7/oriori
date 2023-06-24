import React from 'react';

import '../styles/Header.css';

type Props = {
  mainText?: string,
  secondaryText?: string
};

const Header: React.FC<Props> = ({ mainText, secondaryText }: Props) => {

  return (
    <>
      <header className="header">
        <img src='/oriori-logo.svg' className='header__logo' alt='OriOri Logo'/>
        { mainText && <h1 className='header__h1'> { mainText } </h1> }
        { secondaryText && <h2 className='header__h2'> { secondaryText } </h2> }
      </header>
    </>
  );
};

export default Header;
