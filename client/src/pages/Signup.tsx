import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/Signup.css";

const pwdMsg = [
  {id:0, text:""},
  {id:1, text:"password cannot be empty"},
  {id:2, text:"password must be at least 10 or more characters in length"},
  {id:3, text:"password mis-matched"},
]

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const auth = UserAuth();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [hasAttemptedSignUp, setHasAttemptedSignUp] = useState<boolean>(false);
  const [alertMessage, setAlertMessage ] = useState<string>(pwdMsg[0].text);

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setUsername(event.target.value);
  }
  
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPassword(event.target.value);
  }
  
  const handleConfirmPasswordInput = (event:ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setConfirmPassword(event.target.value);
  }

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  
  const handleSignUp = async (event: FormEvent<HTMLFormElement>): Promise<void>=> {
    event.preventDefault();
    if(!password.length){
      setHasAttemptedSignUp(true);
      setAlertMessage(pwdMsg[1].text);
    } else if (password.length < 10){ 
      setHasAttemptedSignUp(true);
      setAlertMessage(pwdMsg[2].text);
    } else if (password !== confirmPassword){
      setHasAttemptedSignUp(true);
      setAlertMessage(pwdMsg[3].text);
    } else {
      setHasAttemptedSignUp(false);
      setAlertMessage(pwdMsg[0].text);
      try {
        if (auth) {
          await auth.signup(username, email, password);
          navigate('/');
        }
      } catch (error) {
          console.log("🤬", error);
      }
    }
  };
  
  return (
    <>
      <Header
        secondaryText="Sign Up"/>
      <form
        onSubmit = { handleSignUp }>

        <Input
          className = "signup-input" 
          placeholder = "Username"
          type = "text"
          value = { username }
          onChange = { handleUsernameInput }
          />

        <Input 
          className = "signup-input"
          placeholder = "Password"
          type = "password"
          value = { password }
          onChange = { handlePasswordInput }
          />

        <Input 
          className = "signup-input"
          placeholder = "Password Confirmation"
          type = "password"
          value = { confirmPassword }
          onChange = { handleConfirmPasswordInput }
          />
        
        { hasAttemptedSignUp
          ? <div className="div-signup-alertMessage">{alertMessage}</div>
          : <></> }
          
        <Input 
          className = "signup-input"
          placeholder = "Email"
          type = "email"
          value = { email }
          onChange = { handleEmailInput }
          />

        <Button 
          className = "submit"
          text = "Sign Up"
          type = "submit"/>

        <p>
          { "Already have an account? " }
          <Link to = "/">Log In!</Link>
        </p>
      </form>
      <Footer />
    </>
  );
};

export default Signup;