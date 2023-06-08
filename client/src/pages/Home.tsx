import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button';
import Header from "../components/Header";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import './Home.css';
import GridComponent from "../components/Grid";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`/api/${auth?.user.location}/products/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': auth?.csrftoken ?? ""
      }
    })
    .then((response) => {
      console.log('😶‍🌫️', response);
      setProducts(response.data);
    })
    .catch((err) => console.log('😈', err));
}, []);

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

      {
        products.length > 0
        ? <GridComponent productArray={ products } setProductArray={ null }/>
        : <>
            <p>
              These are the products currently available in your selected location!
            </p>
          </>
      }

    <Button
      className="logout"
      text="Log Out"
      type="button"
      onClick={ handleLogout }
    />
    <Navbar/>
  </>
)}