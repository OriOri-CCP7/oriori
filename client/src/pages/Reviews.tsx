import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ReviewGrid from '../components/ReviewGrid';
import './Reviews.css';

function Reviews() {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': auth?.csrftoken ?? ""
    };
    
    axios.get(`/api/users/${auth?.user.uuid}/reviews/products/`, {
      headers: headers
    })
    .then((response) => {
      console.log(response);
      setProducts(response.data);
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header
        className="reviews__header"
        mainText="Your Reviews"/>
      {
        !isLoading
          ? <ReviewGrid productArray={ products }/>
          : <>
              <p>Review products you've tried by tapping the edit icon on any product!</p>
            </>
      }
      
      <Navbar/>

      <Footer 
        className = "footer"
        text="© 2023 OriOri" />
    </div>
  );
};

export default Reviews;