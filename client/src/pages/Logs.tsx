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
  const [loadComplete, setLoadComplete] = useState(false);

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
    .finally(() => setLoadComplete(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header mainText="Tried Products"/>
      <div className='page__wrapper'>
        {
          products.length > 0
            ? <ProductGrid productArray={ products }/>
            : loadComplete && <h2 className='subtitle'>
                Products you've tried are displayed here. Tap the checkmark on any product to add it to this list!
              </h2>
        }
      </div>
      <Navbar/>
    </>
  );
};

export default Logs;