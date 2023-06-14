import React, { useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { UserFavs } from '../context/FavContext';
import { UserReviews } from '../context/ReviewContext';
import './ProductCard.css';
import FavButton from './FavButton';
import ReviewButton from './ReviewButton';

type  Props = {
  product: Product,
  favorite?: Favorite,
  review?: Review
};


function ProductCard ({ product, favorite, review }: Props) {
  const auth = UserAuth();
  const { addFav, removeFav } = UserFavs();
  const { addRev, removeRev } = UserReviews();
  const [isFavorite, setIsFavorite] = useState(favorite ? true : false);

  const currentDate: Date = new Date();
  const offerEndDate: Date = new Date(product.end_date);
  const offerStartDate: Date = new Date(product.start_date);

  const currentDateNum = currentDate.getTime();
  const offerEndNum = offerEndDate.getTime();
  const offerStartNum = offerStartDate.getTime();
  const oneDay: number = 24 * 60 * 60 * 1000;

  const daysSinceStart: number = Math.floor((currentDateNum - offerStartNum) / oneDay);
  const daysBeforeEnd: number = Math.ceil((offerEndNum - currentDateNum) / oneDay);

  let cardClass = "product__card ";
  let availabilityMsg = `Available on ${offerStartDate.toLocaleDateString()}`;
  if (daysSinceStart >= 0) {
    if (daysBeforeEnd < 6) {
      if (daysBeforeEnd >= 0) {
        cardClass += "ending";
        availabilityMsg = `Only available for ${daysBeforeEnd} days!`;
      } else {
        availabilityMsg = "No longer available.";
      }
    } else if (daysSinceStart < 4) {
      cardClass += "new"
      availabilityMsg = "Now available!";
    } else {
      availabilityMsg = `Available until ${offerEndDate.toLocaleDateString()}`;
    }
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': auth?.csrftoken ?? ""
  };

  const addFavHandler = () => {
    axios.post(`/api/users/${auth?.user.uuid}/favorites/newFavorite/`,
      { product_id: product.id },
      { headers: headers }
    )
    .then((response) => {
      addFav(response.data);
    })
    .catch((err) => console.log('😈', err));
  };

  const deleteFavHandler = () => {
    axios.delete(`/api/users/${auth?.user.uuid}/favorites/${favorite!.id}/deletion/`,
      { headers: headers }
    )
    .then(() => {
      removeFav(favorite!.product);
    })
    .catch((err) => console.log('😈', err));
  };
  
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    if (isFavorite) {
      deleteFavHandler();
    } else {
      addFavHandler();
    }
    setIsFavorite(!isFavorite);
  };

  return (
      <div className={ cardClass }>
          <div className="product__img">
              { product.img_url ? <img src={ product.img_url } alt={ product.product_name }/> : <></> }
          </div>
          <div className="product__name">
              { product.product_name }
          </div>
          <div className="product__avail-msg">
              { availabilityMsg }
          </div>
          <ReviewButton productId={ product.id } review={ review }/>
          <FavButton isFavorite={ isFavorite } clickHandler={ clickHandler }/>
      </div>

  );
}

export default ProductCard;