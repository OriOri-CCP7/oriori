import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import ProductGrid from '../components/ProductGrid';

import Navbar from '../components/Navbar';
import Header from '../components/Header';

import axios from 'axios';

// import '../styles/index.css';

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
    <div>
      <Header mainText="Hot Right Now" />
      <ProductGrid productArray={products} />
      <Navbar/>
      
    </div>
  );
}

export default Popular;