import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import app from '../firebase.config';
import { ref, set } from 'firebase/database';
import { UserAuth } from '../context/AuthContext';
import Button from '../components/Button';
import DropdownMenu from '../components/DropdownMenu';
import Header from '../components/Header';

import '../styles/Onboarding.css';

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
        console.log("Setting onboard status...");
        const result = await axios.patch(`/api/users/${auth.user.uuid}/edit/`, {
          location: prefecture
        });
        if (result.status !== 200) {
          throw new Error("User could not be updated.");
        } else {
          const userId = auth.user.uuid as string ?? "";
          if (userId !== "") {
            await set(ref(database, `users/${userId}/onboarded`), true);
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
      <Header/>
      <ruby className="onboarding__kanji">
        <rp>(</rp>四<rt>し</rt>季<rt>き</rt>折<rt>おり</rt>々<rt>おり</rt><rp>)</rp>
      </ruby>
      <p className="onboarding__intro-text">
        <b>oriori</b> comes from the<br/>
        Japanese phrase <i>shikioriori</i>,<br/>
        which means ‘from season to season’
      </p>
      <br/>
      <DropdownMenu className="onboarding__dropdown" labelName={ "Home Prefecture: " } setPrefecture={ setPrefecture } prefill={ prefecture }/>
      <p className="onboarding__instruction-text">
        Products shown on the Home tab are filtered by
        what's available in your Home Prefecture.<br/>
        Pick any Home Prefecture you like.
        <br/><br/>
        <i className="onboarding__instruction-detail">You can change this in the Settings menu,
        or use the Search tab to browse other Prefectures at any time.</i>
      </p>
      <br/>
      <Button
        className={'onboarding__submit-button'}
        text={'Continue'}
        type={'submit'}
        onClick={ clickHandler }
        disabled={ prefecture === "" ? true : false }
        />
    </div>
  );
}

export default Onboarding;