import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import './Popular.css';
import GridComponent from '../components/Grid';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

interface Props {};

function Popular({}: Props) {
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
  }, []);

  return (
    <div>
      <Header
          className="popular-header"
          mainText="Hot Right Now" />
      <GridComponent productArray={products} setProductArray={null}/>
      <Navbar/>
    </div>
  );
}

export default Popular;