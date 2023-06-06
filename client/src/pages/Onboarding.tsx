import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

import app from '../firebase.config';
const { database } = app;
import { ref, set } from 'firebase/database';

import { UserAuth } from '../context/AuthContext';
import prefs from '../prefectures.json';

function Onboarding() {
  const auth = UserAuth();
  const navigate = useNavigate();

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userId = auth?.user.uuid ?? "";
    if (userId !== "") {
      await set(ref(database, 'onboardedUsers/'), {
        userId: true
      });
    }
    navigate("/");
  }
  
  return (
    <>
      <p className="onboarding-text">
        四季折々<br/>
        （しきおりおり）<br/>
        <br/>
        <b>oriori</b> comes from the
        Japanese phrase <i>shikioriori</i>,
        meaning ‘from season to season’
      </p>
      <br/>
      <label>
        Home Prefecture:
        <select>
          {
            prefs.map((element) => {
              return (<option value={element.pk}>{element.name}</option>)
            })
          }
        </select>
      </label>
      <p>
        Select the prefecture you want to use as your Home Prefecture.<br/>
        It can be where you live, where you plan on visiting the most, or just your favorite prefecture!<br/>
        <i>You can change this at any time in the settings menu.</i>
      </p>
      <br/>
      <button onClick={ clickHandler }>
        Continue
      </button>
    </>
  );
}

export default Onboarding;