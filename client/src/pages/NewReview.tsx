import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import axios from 'axios';
import './NewReview.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from "../components/Footer";

function NewReview() {
  const auth = UserAuth();
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    axios.get(`/api/products/${productId}/`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': auth?.csrftoken ?? ""
      }
    })
    .then((response) => {
      setProduct(response.data);
    })
    .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        className="new-review-header"
        mainText="Review a Product"/>
      <>
        <div className="productCard">
          <div className="productImg">
            { product?.img_url ? <img src={product.img_url} alt={product.product_name} /> : <></> }
          </div>
          <div className="productName">
            {product?.product_name}
          </div>
        </div>
        
      </>
      <Navbar/>
      <Footer 
        className = "footer"
        text="© 2023 OriOri" />
    </div>
  );
}

export default NewReview;