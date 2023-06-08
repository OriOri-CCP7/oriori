import React, {useState, useEffect, ChangeEvent} from 'react';
import DropdownMenu from "../components/DropdownMenu";
import {UserAuth} from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Settings.css';

interface Props {
 
};

function Settings({}: Props) {
  const auth  = UserAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('1');
  
  useEffect(()=>{
    getUserData();
  },[]);

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  }
  
  // const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setEmail(event.target.value);
  // }

  const getUserData = async () => {
    try {
      if (auth) {
        const result = await axios.get(`/api/users/${auth.user.uuid}/`);
        setUsername(result.data.username);
        // setEmail(result.data.email);
        setLocation(result.data.location);
      } else {
        navigate("/logout");
      }
    } catch (error) {
      console.log("🍀", `We got error: ${error}`);
      
    } finally {
      console.log("User data retrieved.")
    }
  };
  
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
          navigate("/home");
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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
        <DropdownMenu labelName="Select Prefecture:" setPrefecture={setLocation} prefill={location}/>

        <Button 
          className="submitButton" 
          type="submit" 
          text="Save"
          onClick={handleSubmit}/>
      </form>

    </div>
  );
};

export default Settings;