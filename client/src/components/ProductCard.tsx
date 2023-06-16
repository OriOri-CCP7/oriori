import React, { useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { UserBkmarks } from '../context/BkmarkContext';
import './ProductCard.css';
import BkmarkButton from './BkmarkButton';
import ReviewButton from './ReviewButton';

type  Props = {
  product: Product,
  bookmark?: Bookmark,
  review?: Review
};


function ProductCard ({ product, bookmark, review }: Props) {
  const auth = UserAuth();
  const { addBkmark, removeBkmark } = UserBkmarks();
  const [isBookmark, setIsBookmark] = useState(bookmark ? true : false);

  let availabilityMsg = "No availability info.";
  
  const currentDate: Date = new Date();
  const currentDateNum = currentDate.getTime();
  const oneDay: number = 24 * 60 * 60 * 1000;
  let cardClass = "product__card ";

  if (product.start_date) {
    const offerStartDate: Date = new Date(product.start_date);
    const offerStartNum = offerStartDate.getTime();
    const daysSinceStart: number = Math.floor((currentDateNum - offerStartNum) / oneDay);
    
    availabilityMsg = `Available on ${offerStartDate.toLocaleDateString()}`;
  
    
    if (daysSinceStart >= 0) {
      availabilityMsg = "Now available!";
      if (daysSinceStart < 4) {
        cardClass += "new "
      }
    }
  }

  if (product.end_date) {
    const offerEndDate: Date = new Date(product.end_date);
    const offerEndNum = offerEndDate.getTime();
    const daysBeforeEnd: number = Math.ceil((offerEndNum - currentDateNum) / oneDay);

    if (daysBeforeEnd >= 0) {
      if (daysBeforeEnd < 6) {
        cardClass += "ending";
        availabilityMsg = `Only available for ${daysBeforeEnd} days!`;
      } else {
        availabilityMsg = `Available until ${offerEndDate.toLocaleDateString()}`;
      }
    } else {
      availabilityMsg = "No longer available.";
    }
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': auth?.csrftoken ?? ""
  };

  const addBkmarkHandler = () => {
    axios.post(`/api/users/${auth?.user.uuid}/bookmarks/new/`,
      { product_id: product.id },
      { headers: headers }
    )
    .then((response) => {
      addBkmark(response.data);
    })
    .catch((err) => console.log('😈', err));
  };

  const deleteBkmarkHandler = () => {
    axios.delete(`/api/users/${auth?.user.uuid}/bookmarks/${bookmark!.id}/deletion/`,
      { headers: headers }
    )
    .then(() => {
      removeBkmark(bookmark!.product);
    })
    .catch((err) => console.log('😈', err));
  };
  
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    if (isBookmark) {
      deleteBkmarkHandler();
    } else {
      addBkmarkHandler();
    }
    setIsBookmark(!isBookmark);
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
          <BkmarkButton isBookmark={ isBookmark } clickHandler={ clickHandler }/>
      </div>

  );
}

export default ProductCard;