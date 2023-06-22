import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ProductGrid from '../components/ProductGrid';

import '../styles/Logs.css';

function Logs() {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth?.csrftoken ?? ""
    };
    
    axios.get(`/api/users/${auth?.user.uuid}/logs/products/`, {
      headers: headers
    })
    .then((response) => {
      console.log(response);
      setProducts(response.data);
    })
    .catch((err) => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='header-navbar-container'>
      <Header
        mainText="Tried Products"/>
      {
        products.length > 0
          ? <ProductGrid productArray={ products }/>
          : <>
              <p>Log products you've tried by tapping the plus icon on any product!</p>
            </>
      }
      <Navbar/>
    </div>
  );
};

export default Logs;