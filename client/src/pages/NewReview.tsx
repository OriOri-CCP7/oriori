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
import './NewReview.css';

function NewReview() {
  const auth = UserAuth();
  const { addRev } = UserReviews();

  const navigate = useNavigate();
  
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [rating, setRating] = useState<0 | 1 | 2>(0);
  const [comment, setComment] = useState("");

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

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setComment(event.target.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const review = {
      product: productId,
      rating: rating,
      comment: comment
    };

    try {
      axios.post(`/api/users/${auth?.user.uuid}/reviews/newReview/`, review, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': auth?.csrftoken ?? ""
        }
      })
      .then((response) => {
        if (response.status === 200) {
          addRev(response.data);
          navigate('/reviews');
        }
      })
    } catch (error) {
      console.log("🤨", error);
    }
  };

  return (
    <div>
      <Header
        className="new-review-header"
        mainText="Review a Product"/>
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

export default NewReview;