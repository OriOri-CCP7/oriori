import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import GridComponent from '../components/Grid';
import DropdownMenu from '../components/DropdownMenu';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

interface Props {};

export default function Search({}: Props) {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = (prefId: string) => {
    axios.get(`/api/${prefId}/products/`, {
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
  };

  return (
    <div>
      <Header
        className="search-header"
        mainText="Search" />
      <DropdownMenu 
      labelName='Select a prefecture:' setPrefecture={getProducts} prefill={undefined}/>
      <GridComponent productArray={products} setProductArray={null}/>
      <Navbar/>
    </div>
  );
};