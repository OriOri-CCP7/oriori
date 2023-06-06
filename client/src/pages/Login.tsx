import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Login.css";
import Input from "../components/Input";
import Button from "../components/Button";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = UserAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      if (auth) {
        await auth.login(email, password);
        navigate('/');
      } else {
        console.log('😱', "USER NOT FOUND");
      }
    } catch (error) {
        console.log("🤨", error);
    }
  };
  
  return (
    <>
      <h1>Login</h1>
      <p>
        Don't have an account? 
        <Link to = "/signup"> Sign up! </Link>
      </p>
    </>
  )
}

export default Login;