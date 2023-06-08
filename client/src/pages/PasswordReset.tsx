import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";


const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isResetSuccessful, setisResetSuccessful] = useState<boolean>(false);

  const auth = UserAuth();

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  }

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (auth && email) {
        await auth.resetPassword(email);
        setisResetSuccessful(true);
      }
    } catch (error) {
        console.log("🤬", error);
    }
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
  <Button 
          className = "back-to-login"
          text = "Back to Login Page"
          type = "button"
          onClick={() => navigate('/')} />
  </form>
  
  {isResetSuccessful === true ? (
    <p>A password reset email was sent to your registered email address.</p>
  ) : (
    <></>
  )
  }
  </div>
  )
}

export default PasswordReset;