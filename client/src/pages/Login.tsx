import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Input from "../components/Input";
import "../styles/Login.css";

const alertMsg = [
  {id:0, text:""},
  {id:1, text:"Incorrect Email or Password"}
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = UserAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [attemptedLogin, setAttemptedLogin] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>(alertMsg[0].text)

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEmail(event.target.value);
  }
  
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      if (auth) {
        setAttemptedLogin(false);
        setAlertMessage(alertMsg[0].text);
        const loginResult = await auth.login(email, password);
        if (loginResult?.onboarded) {
          navigate('/home');
        } else {
          navigate('/onboarding');
        }

      } else {
        console.log('😱', "USER NOT FOUND");
      }
    } catch (error) {
      console.log("🤨", error);
      setAttemptedLogin(true);
      setAlertMessage(alertMsg[1].text);
    }
  };
  
  return (
    <>
      <Header mainText="Log In"/>
      <div className="page__wrapper center">
        <form
          onSubmit = { handleLogin }>
          
          <Input 
            className = "login-input"
            placeholder = "Email"
            type = "email"
            autoComplete = "email"
            value = { email }
            onChange = { handleEmailInput }
            />
          
          <Input 
            className = "login-input"
            placeholder = "Password"
            type = "password"
            autoComplete = "current-password"
            value = { password }
            onChange = { handlePasswordInput }
            />
          { attemptedLogin
            ? <div className="div-login-attemped">{ alertMessage }</div>
            : <></> }
          <Button 
            className = "login__button"
            text = "Log In"
            type = "submit"/>
        </form>
        
        <p>
          { "Don't have an account? " }
          <Link to = "/signup">Sign up!</Link>
        </p>

        <p>
          { "Forgot your password? " }
          <Link to = "/new-password">Reset it here!</Link>
        </p>

      </div>
      <Footer />
    </>
  )
}

export default Login;