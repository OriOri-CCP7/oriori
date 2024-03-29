import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header"
import ProductGrid from "../components/ProductGrid";

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
    
    axios.get(`/api/products/popular/`, {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Header mainText="Seasonal Product Tracker"/>
      <div className='page__wrapper'>
        {
          products.length > 0
          ? <>
              <h2 className="subtitle underlined">
                The Most-Liked Products in Japan
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