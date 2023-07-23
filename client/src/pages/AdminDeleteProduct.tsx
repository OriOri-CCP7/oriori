import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TrashButton from '../components/TrashButton';
import '../styles/AdminDeleteProduct.css';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';

function AdminDeleteProduct() {

  const navigate = useNavigate();
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductList = useCallback(async () => {
    const fetchedData = await axios.get('/api/products/')
      .then(result => result.data)
      .catch((error) => console.log('🥲', error));
      setProducts(fetchedData);
  }, [])

  useEffect(() => {
    handleProductList();
  }, [handleProductList]);

  const handleDeletion = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    const productId = event.currentTarget.parentElement?.dataset.productId;
    await axios.delete(`api/products/${productId}/deletion/`);
    handleProductList();
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
        { products.length > 0
        ? products.map((product) => (
          <div key={ product.id } className="product-list-item" data-product-id={ product.id }>
            <p><strong>Product ID:</strong> { product.id }</p>
            <p><strong>Product Name:</strong> { product.product_name }</p>
            <p><strong>Start Date:</strong> { product.start_date }</p>
            <p><strong>End Date:</strong> { product.end_date }</p>
            <TrashButton clickHandler={ handleDeletion }/>
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