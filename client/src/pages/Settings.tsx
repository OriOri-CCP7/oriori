import React, { useState, ChangeEvent } from 'react';
import DropdownMenu from "../components/DropdownMenu";
import { UserAuth } from "../context/AuthContext";
import * as ROLES from "../constants/roles";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import '../styles/Settings.css';

function Settings() {
  const auth  = UserAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>(auth?.user.username ?? '');
  // const [email, setEmail] = useState<string>(auth?.user.email ?? '');
  const [location, setLocation] = useState<string>(auth?.user.location ?? '');
  
  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  }
  
  // const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(event.target.value);
  // }


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

  const handleLogout = async () => {
    try {
      if(auth){
        await auth.logout();
      }
      console.log("User Logged Out");
      navigate('/');
    } catch (error) {
      console.log('🥸', error);
    }
  };

  return (
    <div className="Setting">
      <div className="setting__icon back">
      <ArrowSmallLeftIcon onClick={() => navigate('/home')}/>
      </div>
      <h1>Settings</h1>
      <form>
        <label>Username</label>
        <Input className="usernameInput" placeholder="Username" type="text" value={username} onChange={handleUsernameInput}/>

        {/* <br /> */}
        {/* Email address must update both Firebase and Database
          <label>
            Email Address:
            <Input className="emailInput" placeholder="Email address" type="email" value={email} onChange={handleEmailInput}/>
          </label>
          <br /> 
        */}
        <label>Select Prefecture</label>
        <DropdownMenu setPrefecture={setLocation} prefill={location}/>
        {/* labelName="Select Prefecture: " */}
        <Button 
          className="setting__save-button" 
          type="submit" 
          text="Save"
          onClick={ handleSubmit }
          disabled={ location === "" ? true : false }/>
        <Button
          className="logout__button"
          text="Log Out"
          type="button"
          onClick={ handleLogout } />
      </form>
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