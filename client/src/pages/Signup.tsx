import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Signup.css";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const auth = UserAuth();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setUsername(event.target.value);
  }
  
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPassword(event.target.value);
  }
  
  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  
  const handleSignUp = async (event: FormEvent<HTMLFormElement>): Promise<void>=> {
    event.preventDefault();
    try {
      if (auth) {
        await auth.signup(username, email, password);
        navigate('/login');
      }
    } catch (error) {
        console.log("🤬", error);
    }
  };

  return (
    <>
      <Header
        className="signup-header"
        mainText="Signup Page" />
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

        {/* <Input 
          className = "signup-input"
          placeholder = "Password Confirmation"
          type = "password"
          value = { confirmation }
          onChange = { handlePasswordInput }
          /> */}

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