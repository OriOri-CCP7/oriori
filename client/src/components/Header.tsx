import React from 'react';
import './Header.css';

type Props = {
  className: string,
  mainText: string,
  secondaryText?: string
}

const Header: React.FC<Props> = ({ className, mainText, secondaryText }: Props) => {

  return (
    <>
    <header
      className = { className } >
      <h1> { mainText } </h1>
      <h3> { secondaryText } </h3>
    </header>
    </>
  )
}

export default Header;
