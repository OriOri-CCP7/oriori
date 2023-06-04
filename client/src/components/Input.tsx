import React, { ChangeEventHandler } from "react";
import "./Input.css";

type Props = { 
  className: string,
  placeholder: string,
  type: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
};

const Input: React.FC<Props> = ({ className, placeholder, type, value, onChange }) => {
  return (
    <>
      <input 
        className = { className }
        placeholder = { placeholder }
        type = { type }
        value = { value }
        onChange = { onChange }
      />
    </>
  )
}

export default Input;