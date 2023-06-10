import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import './Home.css';
import Button from '../components/Button';
import Header from "../components/Header";
import Footer from "../components/Footer";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="buttons">
      <Button
      className="logout"
      text="Log Out"
      type="button"
      onClick={ handleLogout } />
      
      <Cog6ToothIcon 
        className="settings-icon"
        onClick = {() => {
          navigate('/settings');
        }} />
    </div>
    
    <Header
        className="homepage-header"
        mainText="OriOri Homepage" />
      {
        products.length > 0
        ? <GridComponent productArray={ products } setProductArray={ null }/>
        : <>
            <p>
              These are the products currently available in your selected location!
            </p>
          </>
      }
    <Navbar/>
    <Footer 
      className = "footer"
      text="© 2023 OriOri" />
  </>
)}