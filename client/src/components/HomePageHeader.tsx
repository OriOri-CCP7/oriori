import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import Button from '../components/Button';
import prefs from '../data/prefectures.json';

import '../styles/HomePageHeader.css'

const HomePageHeader = () => {
  const auth = UserAuth();
  const navigate = useNavigate();

  const location: number = Number(auth?.user.location);
  const prefecture: string = prefs[location - 1].name;
  
  const handleLogout = async () => {
    try {
      if(auth){
        await auth.logout();
      }
      console.log("User Logged Out");
      navigate('/');
    } catch (error) {
      console.log('🥸', error);
    }
  };

    return (
    <div className="header">
    <div className="homepage-logout-section">
      <Button
        className="logout__button"
        text="Log Out"
        type="button"
        onClick={ handleLogout } />
    </div>
    <div className="homepage-setting-section">
      <div className="circular-icon" style={{ background: '#ccc'}}>
        <Cog6ToothIcon 
          className="settings-icon"
          onClick = {() => {
            navigate('/settings');
            }} />
      </div>
    </div>
    <div className="homepage-user-section">
      <div className="homepage-user-picture">
        <div className="circular-icon" style={{ background: 'DodgerBlue', width: '90px', height:'90px' }}>
          {/* {username} */}
          {/* profile picture */}
          </div>
          </div>
          <div>
          <div className="homepage-prefecture">
           {prefecture ? <div>{prefecture}</div> : null}

          </div>
          
          <div className="homepage-title">{"Local Productions"}
          </div>
        </div>
      </div>
    </div>
)
}
export default HomePageHeader;