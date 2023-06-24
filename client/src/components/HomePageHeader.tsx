import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import prefs from '../data/prefectures.json';

import '../styles/HomePageHeader.css'

const HomePageHeader = () => {
  const auth = UserAuth();
  const navigate = useNavigate();

  const location: number = Number(auth?.user.location);
  const prefectureName: string = prefs[location - 1].name;
  

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
        <h1 className="home-header__subtitle heading">
          { "Products in your Home Prefecture" }
        </h1>
        <h2 className="home-header__pref-name heading">
          { prefectureName ?? null }
        </h2>
      </div>
    </div>
)
}
export default HomePageHeader;