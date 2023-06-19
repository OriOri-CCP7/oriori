import React, { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import app from '../firebase.config';
import { ref, get } from 'firebase/database';
import { UserAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import "../styles/index.css";
// import "../styles/App.css";
// import "../styles/Input.css";
// import "../styles/Button.css";

import "../styles/Login.css";

const { database } = app;

const alertMsg = [
  {id:0, text:""},
  {id:1, text:"Incorrect Email or Password"}
];

interface OnboardedUser {
  onboarded: true
};

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

        const loggedinUser = await auth.login(email, password);

        let userSnapshot = await get(ref(database, `onboardedUsers/${loggedinUser.user.uid}`));
        if (userSnapshot.exists()) {
          let userJson = userSnapshot.toJSON();
          if ((userJson as OnboardedUser).onboarded) {
            navigate('/home');
            return;
          }
        }

        navigate('/onboarding');

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
      <Header
        mainText="OriOri Login" />
      <form
        onSubmit = { handleLogin }>
        
        <Input 
          className = "login-input"
          placeholder = "Email"
          type = "email"
          value = { email }
          onChange = { handleEmailInput }
          />
        
        <Input 
          className = "login-input"
          placeholder = "Password"
          type = "password"
          value = { password }
          onChange = { handlePasswordInput }
          />
          {attemptedLogin ? <div className="div-login-attemped">{alertMessage}</div>: <></>}
          <Button 
          className = "submit"
          text = "Log In"
          type = "submit" />
      </form>
      
      <p>
        Don't have an account? 
        <Link to = "/signup"> Sign up! </Link>
      </p>

      <p>
        Forgot your password? 
        <Link to = "/new-password"> Reset it here!</Link>
      </p>

      <Footer />
    </>
  )
}

export default Login;