import React from 'react';
import './Onboarding.css';
import prefs from '../prefectures.json';

function Onboarding() {
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
    </>
  );
}

export default Onboarding;