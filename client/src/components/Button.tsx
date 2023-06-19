import React from "react";

import "../styles/Button.css";

interface Props { 
  className: string,
  text: string,
  type: "button" | "submit" | "reset",
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean
};

function Button({ className, text, type, onClick, disabled }: Props) {
  return (
    <>
      <button 
        className={ className } 
        type={ type }
        onClick={ onClick }
        disabled={ disabled } 
        >
        { text }
      </button>
    </>
  );
};

export default Button;