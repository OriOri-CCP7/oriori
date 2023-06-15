import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { UserReviews } from '../context/ReviewContext';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Input from '../components/Input';
import Navbar from '../components/Navbar';
import RatingSelector from '../components/RatingSelector';
import './EditReview.css';

function EditReview() {
  const navigate = useNavigate();

  const auth = UserAuth();
  const { reviews, isLoadingRevs } = UserReviews();
  
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [rating, setRating] = useState<0 | 1 | 2>(0);
  const [comment, setComment] = useState('');

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

  useEffect(() => {
    if (!isLoadingRevs && productId) {
      setRating(reviews[productId].rating);
      setComment(reviews[productId].comment);
    }
  }, [isLoadingRevs, productId]);

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setComment(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const reviewData = {
      rating: rating,
      comment: comment
    };

    try {
      axios.patch(`/api/users/${auth?.user.uuid}/reviews/${reviews[productId!].id}/edit/`, reviewData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': auth?.csrftoken ?? ""
        }
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/home');
        }
      })
    } catch (error) {
      console.log("🤨", error);
    }
  };

  return (
    <div>
      <Header
        className="edit-review-header"
        mainText="Edit a Review"/>
      <>
        <div className="product__card">
          <div className="product__img">
            { product?.img_url ? <img src={product.img_url} alt={product.product_name} /> : <></> }
          </div>
          <div className="product__name">
            {product?.product_name}
          </div>
        </div>
        <form
          onSubmit = { handleSubmit }>
          
          <RatingSelector rating={rating} setRating={setRating}/>
          
          <Input 
            className = "review-input"
            placeholder = "Comment"
            type = "text"
            value = { comment }
            onChange = { handleCommentInput }
            />
          <Button 
            className = "submit"
            text = "Save Review"
            type = "submit" />
        </form>
      </>
      <Navbar/>
      <Footer 
        className = "footer"
        text="© 2023 OriOri" />
    </div>
  );
};

export default EditReview;