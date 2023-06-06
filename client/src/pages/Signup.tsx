import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('🥵', event.target);
    try {
      if (auth) {
        console.log('🫡', auth);
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
          onChange = {(e) => {
            setUsername(e.target.value);
          }}
          />
        
        <Input 
          className = "signup-input"
          placeholder = "Password"
          type = "password"
          value = { password }
          onChange = {(e) => {
            setPassword(e.target.value);
          }}
          />

        <Input 
          className = "signup-input"
          placeholder = "email"
          type = "email"
          value = { email }
          onChange = {(e) => {
            setEmail(e.target.value);
          }}
          />

        <Button 
          className = "submit"
          text = "Sign Up"
          type = "submit" />
      </form>
    </>
  );
};

export default Signup;