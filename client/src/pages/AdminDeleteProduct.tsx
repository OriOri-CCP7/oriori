import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AdminDeleteProduct.css';

function AdminDeleteProduct() {
  const navigate = useNavigate();
  const auth = UserAuth();

  return (
    <>
      <Header
        mainText='OriOri Admin'
        secondaryText='Delete Product'/>

      <Footer/> 
    </>
  );
};

export default AdminDeleteProduct;