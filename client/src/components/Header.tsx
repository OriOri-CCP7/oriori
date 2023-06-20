import React from 'react';

import '../styles/Header.css';

type Props = {
  mainText: string,
  secondaryText?: string
}

const Header: React.FC<Props> = ({ mainText, secondaryText }: Props) => {

  return (
    <>
    <header
      className="header" >
      <h1> { mainText } </h1>
      <h3> { secondaryText } </h3>
    </header>
    </>
  )
}

export default Header;
