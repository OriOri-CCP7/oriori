import React, { useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import './ReviewCard.css';
import RatingSelector from './RatingSelector';
import ReviewButton from './ReviewButton';

type  Props = {
  product: Product,
  review: Review
};


function ReviewCard({ product, review }: Props) {
  const auth = UserAuth();

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': auth?.csrftoken ?? ""
  };

  // const deleteFavHandler = () => {
  //   axios.delete(`/api/users/${auth?.user.uuid}/favorites/deletion/${favorite!.id}/`,
  //     { headers: headers }
  //   )
  //   .then(() => {
  //     removeFav(favorite!.product);
  //   })
  //   .catch((err) => console.log('😈', err));
  // };
  
  // const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
  //   if (isFavorite) {
  //     deleteFavHandler();
  //   } else {
  //     addFavHandler();
  //   }
  //   setIsFavorite(!isFavorite);
  // };

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
      </div>
    </> 
  );
};

export default ReviewCard;