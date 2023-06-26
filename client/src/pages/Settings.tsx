import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import * as ROLES from "../constants/roles";
import { UserAuth } from "../context/AuthContext";
import Button from "../components/Button";
import DropdownMenu from "../components/DropdownMenu";
import Header from '../components/Header';
import Input from "../components/Input";
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
    <>
      <Header mainText='Settings'/>
      <div className="settings__back-button">
        <ArrowSmallLeftIcon onClick={() => navigate('/home')}/>
      </div>
      <div className="page__wrapper center">
        <form>
          <label>
            Username:
            <Input className="settings__input" placeholder="username" type="text" value={username} onChange={handleUsernameInput}/>
          </label>

          {/* <br /> */}
          {/* Email address must update both Firebase and Database
            <label>
            Email Address:
            <Input className="emailInput" placeholder="Email address" type="email" value={email} onChange={handleEmailInput}/>
            </label>
            <br /> 
          */}
          
          <DropdownMenu labelName={ 'Home Prefecture:' } setPrefecture={ setLocation } prefill={ location }/>
          
          <Button 
            className="settings__save-button" 
            type="submit" 
            text="Save"
            onClick={ handleSubmit }
            disabled={ location === "" ? true : false }/>

        { auth?.role === ROLES.ADMIN
          ? <Button
              className="settings__button"
              type="button"
              text="Add Products"
              onClick={ () => navigate("/admin-addProduct")}
              />
          : null
        }
          <Button
            className="settings__logout-button"
            text="Log Out"
            type="button"
            onClick={ handleLogout } />
        </form>
      </div>
    </>
  );
};

export default Settings;