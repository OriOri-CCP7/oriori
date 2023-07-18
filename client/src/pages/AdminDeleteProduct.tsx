import React, {useState} from 'react'
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

  axios.get('api/products/')
    .then((result) => {
      console.log(result.data);
      setProducts(result.data);
    })
    .catch((error) => console.log('🥲', error));

  return (
    <>
      <Header
        mainText='OriOri Admin'
        secondaryText='Delete Product'/>
      
      <div className='admin__back-button'>
        <ArrowSmallLeftIcon onClick={() => navigate('/home')}/>
      </div>
      
      <ProductGrid productArray={ products } />

      <Footer/> 
    </>
  );
};

export default AdminDeleteProduct;