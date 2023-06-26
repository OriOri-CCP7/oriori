import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import ProductGrid from '../components/ProductGrid';

import Navbar from '../components/Navbar';
import Header from '../components/Header';

import axios from 'axios';

import '../styles/Popular.css';

function Popular() {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('/api/products/popular/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': auth?.csrftoken ?? ""
      }
    })
    .then((response) => {
      setProducts(response.data);
    })
    .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header mainText="Hot Right Now"/>
      <div className='page__wrapper'>
        <h2 className='subtitle underlined'>
          The Most-Liked Products in Japan
        </h2>
        <ProductGrid productArray={products}/>
      </div>
      <Navbar/>
    </>
  );
}

export default Popular;