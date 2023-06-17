import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import ProductGrid from '../components/ProductGrid';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Bookmarks.css';

function Bookmarks() {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get(`/api/users/${auth?.user.uuid}/bookmarks/products/`, {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        className="bookmarks-header"
        mainText="Bookmarks" />
      {
        products.length > 0
        ? <ProductGrid productArray={products} />
        : <>
            <p>Add to your bookmarks by tapping the heart icon on any product!</p>
          </>
      }
      
      <Navbar/>

      <Footer 
        className = "footer"
        text="© 2023 OriOri" />
    </div>
  );
};

export default Bookmarks;