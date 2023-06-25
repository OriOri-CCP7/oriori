import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import ProductGrid from '../components/ProductGrid';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

import '../styles/Bookmarks.css';

import axios from 'axios';

function Bookmarks() {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loadComplete, setLoadComplete] = useState(false);

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
    .catch((err) => console.log(err))
    .finally(() => setLoadComplete(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header mainText="Bookmarks"/>
      <div className='page__wrapper'>
        {
          products.length > 0
            ? <ProductGrid productArray={products} />
            : loadComplete && <h2 className="subtitle">
                Bookmarked products are displayed here. Tap the book mark ribbon on any product to add it to your bookmarks!
              </h2>
        }
      </div>
      <Navbar/>
    </>
  );
};

export default Bookmarks;