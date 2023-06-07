import React, { useState, FormEvent, ChangeEvent } from "react";
import { UserAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";


const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const auth = UserAuth();

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await auth?.resetPassword(email);
  }

  return (
  <div className="password-reset-form">
  <h1>Password Reset</h1>
  <form onSubmit = { handleResetPassword }>
  
  <Input 
          className = "login-input"
          placeholder = "Email"
          type = "email"
          value = { email }
          onChange = { handleEmailInput }/>
  <Button 
          className = "submit"
          text = "Reset Password"
          type = "submit" />
  </form>
  
  </div>
  )
}

export default PasswordReset;