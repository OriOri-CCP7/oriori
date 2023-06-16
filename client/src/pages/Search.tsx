import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import './Search.css';
import ProductGrid from '../components/ProductGrid';
import DropdownMenu from '../components/DropdownMenu';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from "../components/Footer";

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
    <div>
      <Header
        className="search-header"
        mainText="Search"/>
      <DropdownMenu 
        labelName='Select a prefecture: '
        setPrefecture={ getProducts }/>
      {
        products.length > 0
        ? <ProductGrid productArray={ products }/>
        : <>
            <p>Search for products in any prefecture!</p>
          </>
      }
      <Navbar/>
      <Footer 
        className="footer"
        text="© 2023 OriOri"/>
    </div>
  );
};