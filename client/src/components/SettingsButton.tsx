import React from 'react';
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import '../styles/SettingsButton.css';

function SettingsButton() {
  const navigate = useNavigate();
  return (
    <div className="circular-icon__wrapper">
      <div className="circular-icon">
        <Cog6ToothIcon 
          className="settings-icon"
          onClick = {() => {
            navigate('/settings');
          }}/>
      </div>
    </div>
  );
};

export default SettingsButton;