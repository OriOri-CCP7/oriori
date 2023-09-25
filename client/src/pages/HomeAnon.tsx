import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header"
// TODO: Disable or hide log/like buttons or have them redirect to signup or login
import ProductGrid from "../components/ProductGrid";
// TODO: Hide navbar or hide page icons which require login
// TODO: Display Login button in header
import Navbar from "../components/Navbar";

import axios from "axios";

import "../styles/Home.css";

export default function HomeUser() {
  
  const navigate = useNavigate();
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadComplete, setLoadComplete] = useState(false);
  
  useEffect(() => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth?.csrftoken ?? ""
    };
    
    axios.get(`/api/products/`, {
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

  useEffect(() => {
    if (auth?.user?.uuid) {
      navigate('/home');
      return;
    }
  }, [auth]);

  return (
    <>
      <Header mainText="Home"/>
      <div className='page__wrapper'>
        {
          products.length > 0
          ? <>
              <h2 className="subtitle underlined">
                { `All Products` }
              </h2>
              <ProductGrid productArray={ products }/>
            </>
          : loadComplete && <h2 className="subtitle">
              No products could be found.
            </h2>
        }
      </div>
      {/* <Navbar/> */}
    </>
)}