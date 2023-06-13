import React, { useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { UserFavs } from '../context/FavContext';
import './Card.css';
import FavButton from './FavButton';

type  Props = {
  product: Product,
  favorite?: Favorite
};


const Card :React.FC<Props> = ({product, favorite}) => {
  const auth = UserAuth();
  const { addFav, removeFav } = UserFavs();
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

  let cardClass = "productCard ";
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
    axios.post(`/api/favorites/${auth?.user.uuid}/newFavorite/`,
      { product_id: product.id },
      { headers: headers }
    )
    .then((response) => {
      addFav(response.data);
    })
    .catch((err) => console.log('😈', err));
  };

  const deleteFavHandler = () => {
    axios.delete(`/api/favorites/${auth?.user.uuid}/deletion/${favorite!.id}/`,
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
      <div className={cardClass}>
          <div className="productImg">
              { product.img_url ? <img src={product.img_url} alt={product.product_name} /> : <></> }
          </div>
          <div className="productName">
              {product.product_name}
          </div>
          <div className="productAvailMsg">
              {availabilityMsg}
          </div>
          <FavButton isFavorite={isFavorite} clickHandler={clickHandler}/>
      </div>

  );
}

export default Card;