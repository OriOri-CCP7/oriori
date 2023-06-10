import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import app from '../firebase.config';
import { ref, set } from 'firebase/database';
import { UserAuth } from '../context/AuthContext';
import DropdownMenu from '../components/DropdownMenu';
import './Onboarding.css';

const { database } = app;

function Onboarding() {
  const auth = UserAuth();
  const navigate = useNavigate();
  
  const [prefecture, setPrefecture] = useState<string>("13");
  
  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (auth) {
        setPrefecture(auth.user.location);
        console.log("Attempting to update User info");
        const result = await axios.patch(`/api/users/${auth.user.uuid}/edit/`, {
          location: prefecture
        });
        if (result.status !== 200) {
          throw new Error("User could not be updated.");
        } else {
          const userId = auth.user.uuid as string ?? "";
          if (userId !== "") {
            await set(ref(database, `onboardedUsers/${userId}`), { onboarded: true });
          } else {
            throw new Error("User could not be saved as onboarded.")
          }
          auth.dispatchUser({
            type: 'set_location',
            newLocation: prefecture
          });
          navigate("/home");
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  }
  
  return (
    <div className="onboarding">
      <p className="onboarding__intro-text">
        四季折々<br/>
        （しきおりおり）<br/>
        <br/>
        <b>oriori</b> comes from the<br/>
        Japanese phrase <i>shikioriori</i>,<br/>
        meaning ‘from season to season’
      </p>
      <br/>
      <DropdownMenu labelName={"Home Prefecture: "} setPrefecture={setPrefecture} prefill={prefecture}/>
      <p className="onboarding__instruction-text">
        Select the prefecture you want to use as your Home Prefecture. 
        It can be where you live, where you plan on visiting the most, 
        or just your favorite prefecture! <i>You can change this at any time in the settings menu.</i>
      </p>
      <br/>
      <button onClick={ clickHandler }>
        Continue
      </button>
    </div>
  );
}

export default Onboarding;