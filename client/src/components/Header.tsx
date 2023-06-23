import React from 'react';

import '../styles/Header.css';

type Props = {
  mainText?: string,
  secondaryText?: string
}

const Header: React.FC<Props> = ({ mainText, secondaryText }: Props) => {

  return (
    <>
    <header
      className="header">
        <img src='/oriori-logo.svg' className='header__logo' alt='OriOri Logo'/>
    </header>
      <div className="header__bottom-container">
      { mainText && <h1> { mainText } </h1> }
      { secondaryText && <h2> { secondaryText } </h2> }
      </div>
    </>
  )
}

export default Header;
