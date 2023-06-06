import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Signup.css";
import Input from "../components/Input";
import Button from "../components/Button";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const auth = UserAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmation, setConfirmation] = useState('');

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  }
  
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPassword(event.target.value);
  }
  
  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (auth) {
        await auth.signup(username, email, password);
        navigate('/');
      } else {
        console.log('😇', "NOPE");
      }
    } catch (error) {
        console.log("🤬", error);
      }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form
        onSubmit = { handleSignUp } >
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
          value = { confirmation }
          onChange = { handlePasswordInput }
          />

        <Input 
          className = "signup-input"
          placeholder = "email"
          type = "email"
          value = { email }
          onChange = { handleEmailInput }
          />

        <Button 
          className = "submit"
          text = "Sign Up"
          type = "submit" />

<p>
          Already have an account? 
          <Link to = "/"> Log In! </Link>
        </p>
      </form>
    </>
  );
};

export default Signup;