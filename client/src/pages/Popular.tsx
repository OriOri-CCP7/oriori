import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import GridComponent from '../components/Grid';
import Navbar from '../components/Navbar';

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
      <h1>
        Popular
      </h1>
      <GridComponent productArray={products} setProductArray={null}/>
      <Navbar/>
    </div>
  );
}

export default Popular;