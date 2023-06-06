import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';

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
    <h1>Home</h1>
    <Button
      className="logout"
      text="Log Out"
      type="button"
      onClick={ handleLogout }
    />
  </>
)}