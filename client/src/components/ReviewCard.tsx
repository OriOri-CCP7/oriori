import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { UserReviews } from '../context/ReviewContext';
import RatingSelector from './RatingSelector';
import ReviewButton from './ReviewButton';
import './ReviewCard.css';
import DeleteButton from './DeleteButton';

type  Props = {
  product: Product,
  review: Review
};

function ReviewCard({ product, review }: Props) {
  const navigate = useNavigate();
  const auth = UserAuth();
  const { removeRev } = UserReviews();
  const [deleteSelected, setDeleteSelected] = useState(false);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': auth?.csrftoken ?? ""
  };

  const deleteRevHandler = () => {
    axios.delete(`/api/users/${auth?.user.uuid}/reviews/${review.id}/deletion/`,
      { headers: headers }
    )
    .then(() => {
      removeRev(review.product);
      setDeleteSelected(false);
      navigate(0);
    })
    .catch((err) => console.log('😈', err));
  };
  
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    if (deleteSelected) {
      deleteRevHandler();
    } else {
      setDeleteSelected(true);
    }
  };

  return (
    <>
      <div className="product__card">
        <div className="product__img">
          { product.img_url ? <img src={product.img_url} alt={product.product_name} /> : <></> }
        </div>
        <div className="product__name">
          { product.product_name }
        </div>
        <div>
          Available from: { product.start_date }
        </div>
        <div>
          Available until: { product.end_date }
        </div>
      </div>
      <div className="review__card">
        <RatingSelector rating={ review.rating } setRating={ () => {} } disabled/>
        <div className="review__comment">
          { review.comment }
        </div>
        <ReviewButton productId={ product.id } review={ review }/>
        <DeleteButton clickHandler={ clickHandler }/>
        { deleteSelected && 'Tap trashcan again to confirm.' }
      </div>
    </> 
  );
};

export default ReviewCard;