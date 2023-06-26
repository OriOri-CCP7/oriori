import React, { useState, FormEvent } from "react";
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
          let newUser = await auth.signup(username, email, password);
          if (newUser) {
            navigate('/onboarding');
          }
        }
      } catch (error) {
        console.log("🤬", error);
      }
    }
  };
  
  return (
    <>
      <Header mainText="Sign Up"/>
      <div className="page__wrapper center">
        <form
          onSubmit = { handleSignUp }>

          <Input
            className = "signup-input" 
            placeholder = "Username"
            type = "text"
            autoComplete = "nickname"
            value = { username }
            onChange = { (event) => setUsername(event.target.value) }
            />

          <Input 
            className = "signup-input"
            placeholder = "Password"
            type = "password"
            autoComplete = "new-password"
            value = { password }
            onChange = { (event) => setPassword(event.target.value) }
            />

          <Input 
            className = "signup-input"
            placeholder = "Password Confirmation"
            type = "password"
            autoComplete = "new-password"
            value = { confirmPassword }
            onChange = { (event) => setConfirmPassword(event.target.value) }
            />
          
          { hasAttemptedSignUp
            ? <div className="div-signup-alertMessage">{alertMessage}</div>
            : <></> }
            
          <Input 
            className = "signup-input"
            placeholder = "Email"
            type = "email"
            autoComplete = "username"
            value = { email }
            onChange = { (event) => setEmail(event.target.value) }
            />

          <Button 
            className = "signup__button"
            text = "Sign Up"
            type = "submit"/>

          <p>
            { "Already have an account? " }
            <Link to = "/">Log In!</Link>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;