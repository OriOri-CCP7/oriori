import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import ProductGrid from '../components/ProductGrid';
import DropdownMenu from '../components/DropdownMenu';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

import axios from 'axios';

import '../styles/Search.css';

export default function Search() {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = (prefId: string) => {
    if (prefId !== "") {
      axios.get(`/api/locations/${prefId}/products/`, {
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
    } else {
      setProducts([]);
    }
  };

  return (
    <div className='page__wrapper'>
      <Header mainText="Search"/>
      <h2 className='search__subtitle'>
        Search for products in any prefecture.
      </h2>
      <DropdownMenu 
        className='search__dropdown'
        labelName='Select a prefecture:'
        setPrefecture={ getProducts }/>
      <ProductGrid productArray={ products }/>
      <Navbar/>
    </div>
  );
};