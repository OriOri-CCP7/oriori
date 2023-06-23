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
      { mainText ? <h1> { mainText } </h1> : <img src='/oriori-logo.svg' className='header__logo' alt='OriOri Logo'/> }
      { secondaryText && <h2> { secondaryText } </h2> }
    </header>
    </>
  )
}

export default Header;
