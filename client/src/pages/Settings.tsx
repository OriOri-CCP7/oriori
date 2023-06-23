import React, { useState, ChangeEvent } from 'react';
import DropdownMenu from "../components/DropdownMenu";
import { UserAuth } from "../context/AuthContext";
import * as ROLES from "../constants/roles";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import '../styles/Settings.css';
import Toggle from '../components/ToggleButton';

const cardMenuNotify = [
  {id:0, text:""},
  {id:1, text:"Card Menu Set to Left Hand Side"},
  {id:2, text:"Card Menu Set to Right Hand Side"}
]

function Settings() {
  const auth  = UserAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(auth?.user.username ?? '');
  // const [email, setEmail] = useState<string>(auth?.user.email ?? '');
  const [location, setLocation] = useState<string>(auth?.user.location ?? '');
  const [leftSide, setLeftSide] = useState<boolean>(false); // Need to write to a 'setting' table
  const [leftSideNotify, setLeftSideNotify] = useState<string>(cardMenuNotify[0].text);
  
  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  }
  
  // const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(event.target.value);
  // }
  
  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/home');
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Submit clicked");
    try {
      if (auth) {
        console.log("Attempting to update User info");
        const result = await axios.patch(`/api/users/${auth.user.uuid}/edit/`, {
          username: username,
          email: auth.user.email,
          location: location
        });
        if (result.status !== 200) {
          throw new Error("User could not be updated.");
        } else {
          auth.dispatchUser({
            type: 'set_user',
            newUsername: username,
            // newEmail: email,
            newLocation: location
          });
          navigate("/home");
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleToggled = (event: ChangeEvent<HTMLInputElement>) => {
    setLeftSide(!leftSide);
    if(leftSide===true){
      setLeftSideNotify(cardMenuNotify[1].text);
    } else {
      setLeftSideNotify(cardMenuNotify[2].text);
    }
    setTimeout(()=>{
      setLeftSideNotify(cardMenuNotify[0].text);
    },3000);
  }

  return (
    <div className="Setting">
      <Button className="backButton" type="button" onClick={handleBack} text="Back"/>
      <h1>Settings</h1>
      <form>
        <label>
          Username:
          <Input className="usernameInput" placeholder="Username" type="text" value={username} onChange={handleUsernameInput}/>
        </label>
        <br />
        {/* Email address must update both Firebase and Database
          <label>
            Email Address:
            <Input className="emailInput" placeholder="Email address" type="email" value={email} onChange={handleEmailInput}/>
          </label>
          <br /> 
        */}
        <DropdownMenu labelName="Select Prefecture: " setPrefecture={setLocation} prefill={location}/>

        <Button 
          className="submitButton" 
          type="submit" 
          text="Save"
          onClick={ handleSubmit }
          disabled={ location === "" ? true : false }/>
      </form>
        <div className="Settings-usersetting">
          <div className="Title-User-Setting">{"User Preferences"}</div>
          <div className="LeftSide-Menu">
            <div className="Set-Menu-on-left">
            <strong>{"Product Menu on the left handside"}</strong>
            <Toggle label={leftSide ? "left" : "right"} toggled={leftSide} onClick={handleToggled}></Toggle>
            <br />{leftSideNotify}
            </div>
          </div>
        </div>
      { auth?.role === ROLES.ADMIN
        ? <Button
          className="navButton"
          type="button"
          text="Add Products"
          onClick={ () => navigate("/admin-addProduct")}
          />
        : null
      }
    </div>
  );
};

export default Settings;