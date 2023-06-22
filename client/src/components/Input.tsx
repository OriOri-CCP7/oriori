import React, { ChangeEventHandler } from "react";

import "../styles/Input.css";

type Props = { 
  className: string,
  placeholder: string,
  type: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  required?: boolean
};

const Input: React.FC<Props> = ({ className, placeholder, type, value, onChange, required }) => {
  return (
    <>
      <input 
        className = { className }
        placeholder = { placeholder }
        type = { type }
        value = { value }
        onChange = { onChange }
        required = { required }
      />
    </>
  )
}

export default Input;