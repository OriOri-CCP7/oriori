import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import DropdownMenu from "../components/DropdownMenu";
import {UserAuth} from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './Settings.css';

interface Props {
 
};

function Settings({}: Props) {
  const auth  = UserAuth();
  const navigate = useNavigate();

/**
 * User Setting
 */

  // const userDatabase = { username, email, uuid, location}
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [uuid, setUuid] = useState<string>('');
  const [location, setLocation] = useState<number>(1);
  const [passwordMessage, setPasswordMessage] = useState<string>('');



  const [storedUserData, setStoredUserData] = useState({});
  // const [storedlocation, setStoredLocation] = useState(location)
  

  const userData = {};
  useEffect(()=>{
    getUserData();
    console.log("🐯",storedUserData);
  },[]);

  // const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>): void => {
  //   event.preventDefault();
  //   setUsername(event.target.value);
  // }
  
  // const handleNewPasswordInput = (event: ChangeEvent<HTMLInputElement>): void => {
  //   event.preventDefault();
  //   setNewPassword(event.target.value);
  // }
  
  // const handleEmailInput = (event: ChangeEvent<HTMLInputElement>): void => {
  //   event.preventDefault();
  //   setEmail(event.target.value);
  // }

  const getUserData = async () => {
    try {
      if (auth){
        const result = await axios.get(`/user/${auth.user}/`);
        setStoredUserData(result.data);
        setUsername(result.data.username);
        setOldPassword(result.data.password);
        setUuid(result.data.uuid);
        setLocation(result.data.location);
      } else {
        navigate("/logout");
      }
    } catch (error) {
      console.log("🍀", `We got error: ${error}`);
      
    } finally {
      console.log("getUserData attempt has been launched")
    }

  }
  
  const handleBack = (event:React.MouseEvent<HTMLButtonElement> ) => {
    event.preventDefault();
    navigate('/');
  }
  // FormEvent<HTMLFormElement>
  const handleUserDataChange=  async (event: FormEvent<HTMLFormElement>): Promise<void>=>{
    event.preventDefault();
  }
  
/**
 *  Preference
 */

const [darkmode, setDarkmode] =useState<string>("on");


  return (
    <div className="Setting">
      <Button className="backButton" type="button" onClick={handleBack} text="Back"/>
      <h1>Settings</h1>
      <h2>User Setting</h2>
      <form 
      onSubmit = {handleUserDataChange}>
        <label>Username :</label>
        <Input className="username" placeholder={"username cannot be empty"} type="text" value={username} onChange={ (event) => {
            event.preventDefault();
            //setStoredInputUser(event.target.value)
            }
            } />
        <br />
        <label>Email Address:</label>
        <p>{email}</p>
        {/* <input type="email" defaultValue="example@email.com"
        value={email} /> */}
        <br />
        <label>Change Password:</label>
        <Input className="newPassword" placeholder={"Enter your new password"} type="password" value={""} onChange={()=> {}}/>
        <br />
        <label>Confirm Password:</label>
        <Input className="confirmPassword" placeholder={"Retype your password"} type="password" value={""} onChange={()=> {}}/>
        {passwordMessage}
        <div className="prefectureTable">
          <div className="row">
            <div className="cell">
              <label>Home Prefecture:</label>
              </div>
            <div className="cell">
              <DropdownMenu labelName="Select location:" setPrefecture={(element) => {
              console.log(element);
              setLocation(parseInt(element));
              // setDefault(location) // need update dropdown menu to set location if default location are given
              } 
              }/>
            </div>
          </div>
        </div>
        
        <label>Update User Data</label>
        <Button 
        className="submit" 
        type="submit" 
        text="Update" />
      </form>
      <hr />
      <h2>Preference</h2>
      <form>
      <label>Dark Mode</label>
      <input
        className="darkmode-input"
        type="radio"
        id="on"
        name="slide-switch"
        value="on"
        checked={darkmode === "on"}
        onChange={(e) => setDarkmode(e.target.value)}
/>
      <label className="darkmode" htmlFor="on">On</label>

        <input
          className="darkmode-input"
          type="radio"
          id="off"
          name="slide-switch"
          value="off"
          checked={darkmode === "off"}
          onChange={(e) => setDarkmode(e.target.value)}
/>
<label className="darkmode" htmlFor="off">Off</label>
      </form>
    </div>
  );
}

export default Settings;