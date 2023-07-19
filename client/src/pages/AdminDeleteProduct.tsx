import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AdminDeleteProduct.css';
import ProductGrid from '../components/ProductGrid';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';

function AdminDeleteProduct() {

  const navigate = useNavigate();
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductList = useCallback(async () => {
    const fetchedData = await axios.get('/api/products/')
      .then(result => result.data)
      .catch((error) => console.log('🥲', error));
      console.log("DATA: ", fetchedData);
      setProducts(fetchedData);
  }, [])

  useEffect(() => {
    handleProductList();
    console.log("PRODUCTS: ", products);
  }, [handleProductList]);

  const handleDeletion = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    console.log('🌭', event.target);
    // await axios.delete('api/products/<int:id>/deletion/')
  }

  return (
    <>
      <Header
        mainText='OriOri Admin'
        secondaryText='Delete Product'/>
      
      <div className='admin__back-button'>
        <ArrowSmallLeftIcon onClick={() => navigate('/home')}/>
      </div>
      
      <div>
        {(products.length > 0)
        ? products.map((product) => (
          <div className="product-list-item">
            <p>Product ID: { product.id }</p>
            <p>Product Name: { product.product_name }</p>
            <p>Start Data: { product.start_date }</p>
            <p>End Date: { product.end_date }</p>
          </div>
        ))
        : "Loading..."
        }
      </div>

      <Footer/> 
    </>
  );
};

export default AdminDeleteProduct;