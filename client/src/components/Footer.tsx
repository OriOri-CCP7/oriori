import React from 'react';
import './Footer.css';

type Props = {
  className: string,
  text: string,
}

const Footer: React.FC<Props> = ({ className, text }) => {
  return (
    <>
    <footer
      className = { className } >
      <p>{ text }</p>
    </footer>
    </>
  )
}

export default Footer;
