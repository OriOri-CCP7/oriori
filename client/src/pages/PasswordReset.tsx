import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/index.css";
import "../styles/App.css";
import "../styles/Input.css";
import "../styles/Button.css";


const PasswordReset: React.FC = () => {
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
  <Header mainText="OriOri Password Reset" />
  <p className="reset-message">Enter your email and we'll send you a link to reset your password.</p>
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
  <Link to = "/"> Go back to Login Page! </Link>
  </form>
  
  {isResetSuccessful === true ? (
    <p>A password reset email was sent to your registered email address.</p>
  ) : (
    <></>
  )
  }

<Footer />
  </div>
  )
}

export default PasswordReset;