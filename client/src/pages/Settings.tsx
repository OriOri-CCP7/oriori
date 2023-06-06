import React from 'react';
import DropdownMenu from "../components/DropdownMenu";
import {UserAuth} from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";

interface Props {
 
};

function Settings({}: Props) {
  const auth  = UserAuth();
  const navigate = useNavigate();
  
  const handleBack = (event:React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    navigate('/');
  }
  const handleUsernameChange: (event: FormEvent<HTMLFormElement>) = (event) =>{

  }
  return (
    <div className="Setting">
      <Button className="backButton" type="button" onClick={handleBack} text="Back"/>
      <h1>Settings</h1>
      <h2>Username</h2>
      <form>
        <label >
          Username
          <Input className = "username" placeholder = {"username"} type = "text" value = { auth.user } onChange = { handleUserNameChange} />
        </label>
        <label>
          Email Address
          <input type="email" defaultValue="example@email.com"/>
        </label>
        <label>
          Home Prefecture
          <DropdownMenu labelName="" setPrefecture={(element) => console.log(element)} />
        </label>
      </form>
    </div>
  );
}

export default Settings;