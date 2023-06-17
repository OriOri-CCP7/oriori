import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import HomePageHeader from "../components/HomePageHeader"
import ProductGrid from "../components/ProductGrid";
import Navbar from "../components/Navbar";

import axios from "axios";
import './Home.css';

export default function Home() {
  
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth?.csrftoken ?? ""
    };
    
    axios.get(`/api/locations/${auth?.user.location}/products/`, {
      headers: headers
    })
    .then((response) => {
      console.log('😶‍🌫️', response);
      setProducts(response.data);
    })
    .catch((err) => console.log('😈', err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <>
    <HomePageHeader />
    
    
      {
        products.length > 0
        ? <ProductGrid productArray={ products }/>
        : <>
            <p>
              These are the products currently available in your selected location!
            </p>
          </>
      }
    <Navbar/>
    <br />
    <br />
    
  </>
)}