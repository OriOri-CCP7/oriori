import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import HomePageHeader from "../components/HomePageHeader"
import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";
import prefs from "../data/prefectures.json";

import axios from "axios";

import "../styles/Home.css";

export default function Home() {
  
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadComplete, setLoadComplete] = useState(false);
  const location: number = Number(auth?.user.location);
  const prefectureName: string = prefs[location - 1].name;
  
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
      console.log('🏠 HOME: ', response);
      setProducts(response.data);
    })
    .catch((err) => console.log('😈', err))
    .finally(() => setLoadComplete(true));;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <div className='page__wrapper'>
    <HomePageHeader/>
      {
        products.length > 0
          ? <>
              <h2 className="home__subtitle">
                { `Products Available in ${ prefectureName }` }
              </h2>
              <ProductGrid productArray={ products }/>
            </>
          : loadComplete && <h2 className="home__subtitle">
              No products could be found in your Home Prefecture.
            </h2>
      }
      <Navbar/>
  </div>
)}