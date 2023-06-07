import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Header from "../components/Header";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import './Home.css';
import GridComponent from "../components/Grid";

export default function Home() {
  const navigate = useNavigate();
  const auth = UserAuth();

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
  <>
    <Cog6ToothIcon 
      className="settings-icon"
      onClick = {() => {
        navigate('/settings');
      }}/>
    
    <Header
        className="homepage-header"
        mainText="Home Page" />

    {/* <GridComponent
      className="homepage-grid"
      setProductArray={()=>[]} /> */}

    <Button
      className="logout"
      text="Log Out"
      type="button"
      onClick={ handleLogout }
    />
  </>
)}