import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import axios from "axios";
import './Home.css';
import Button from '../components/Button';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";

import prefs from '../data/prefectures.json';

type Prefect = {
  pk: number,
  name: string,
}


export default function Home() {
  const navigate = useNavigate();
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  let prefecture = "";
  const location = useRef<string>(auth?.user.location ?? '');
  // const prefecture = useRef<string>(prefs.pk[location.current])
  const prefObj:Prefect | undefined = prefs.find(pref => pref.pk.toString() === location.current);
  if(prefObj){
    prefecture= prefObj.name
  }
  
  

  useEffect(() => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth?.csrftoken ?? ""
    };
    
    axios.get(`/api/locations/${auth?.user.location}/products/`, {
      headers: headers
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
    <div className="user-location">
      {prefecture}
    </div>
    <Header
        className="homepage-header"
        mainText="OriOri Homepage" />
      {
        products.length > 0
        ? <ProductGrid productArray={ products }/>
        : <>
            <p>
              These are the products currently available in your selected location!
            </p>
          </>
      }
    <Navbar/>
    <br />
    <br />
    <Footer 
      className = "footer"
      text="© 2023 OriOri" />
  </>
)}