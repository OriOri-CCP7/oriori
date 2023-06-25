import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';

import '../styles/HomePageHeader.css'

const HomePageHeader = () => {
  const auth = UserAuth();
  const navigate = useNavigate();
  

    return (
    <div className="header home">
      <div className="home-header__top-container">
        <img src='/oriori-logo.svg' className='home-header__logo header__logo' alt='OriOri Logo'/>
        <div className="circular-icon">
          <Cog6ToothIcon 
            className="settings-icon"
            onClick = {() => {
              navigate('/settings');
            }}/>
        </div>
      </div>
      <div className="home-header__bottom-container">
        <h1 className="header__h1">
          Home
        </h1>
      </div>
    </div>
)
}
export default HomePageHeader;