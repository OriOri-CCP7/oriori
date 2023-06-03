import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import "./Signup.css";

type Props = { 
  className: string, 
};

const Signup: React.FC<Props> = () => {
  const auth = UserAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (auth) {
        auth.signup(username, email, password);
      } 
    } catch (error) {
        console.log("🤬", error);
      }
  };

  return (
    <>
      <form></form>
    </>
  );
};

export default Signup;