import React, {useState, useEffect} from 'react';
import DropdownMenu from "../components/DropdownMenu";
import {UserAuth} from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import axios from 'axios'

interface Props {
 
};

function Settings({}: Props) {
  const auth  = UserAuth();
  const navigate = useNavigate();
  // const userDatabase = { username, email, uuid, location}
  let username, email, uuid, location;

  const userData = {};
  useEffect(()=>{
    getUserData();
  },[]);
  const getUserData = async () => {
    try {
      if (auth){
        const result = await axios.get(`/user/${auth.user.username}/`);
        setStoredInputUser(result.data);
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
  const handleUsernameChange=  (event: React.ChangeEvent<HTMLInputElement>) =>{
    event.preventDefault();
    
  }
  const [storedUserName, setStoredInputUser] = useState({});
  const [storedlocation, setStoredLocation] = useState(location)
  
  return (
    <div className="Setting">
      <Button className="backButton" type="button" onClick={handleBack} text="Back"/>
      <h1>Settings</h1>
      <h2>Username</h2>
      <form >
        <label>Username :</label>
        
          <Input className="username" placeholder={"username cannot be empty"} type="text" value={ "" } onChange={ (event) => {
            event.preventDefault();
            //setStoredInputUser(event.target.value)
            }
            } />
        <br />
        <label>
          Email Address:
        </label>
        <input type="email" defaultValue="example@email.com"/>
        <br />
        <div >
        <label>
          Home Prefecture:
          
        </label>
        <DropdownMenu labelName="" setPrefecture={(element) => console.log(element)} />
        </div>
        
        <Button className="SaveButton" type="submit" text="Update" onClick={() => {}}/>
      </form>
    </div>
  );
}

export default Settings;