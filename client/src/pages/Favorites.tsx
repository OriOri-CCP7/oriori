import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import './Favorites.css';
import GridComponent from '../components/Grid';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

interface Props {};

function Favorites({}: Props) {
const auth = UserAuth();
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
    axios.get(`/api/products/${auth?.user.uuid}/favorites/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': auth?.csrftoken ?? ""
        }
    })
    .then((response) => {
        console.log(response);
        setProducts(response.data);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <div>
      <Header
        className="favorites-header"
        mainText="Favorites" />
      {
        products.length > 0
        ? <GridComponent productArray={products} setProductArray={null}/>
        : <>
            <p>Add to your favorites by tapping the heart icon on any product!</p>
          </>
      }
      
      <Navbar/>
    </div>
  );
};

export default Favorites;