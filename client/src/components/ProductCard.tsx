import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { UserBkmarks } from '../context/BkmarkContext';
import { UserLogs } from '../context/LogContext';
import BkmarkButton from './BkmarkButton';
import LikeButton from './LikeButton';
import LogButton from './LogButton';
import ShareButton from './ShareButton';

import '../styles/ProductCard.css';

type  Props = {
  product: Product,
  bookmark?: Bookmark,
  log?: Log
};

function ProductCard ({ product, bookmark, log }: Props) {
  const navigate = useNavigate();
  const auth = UserAuth();
  const { addBkmark, removeBkmark } = UserBkmarks();
  const { addLog, editLog, removeLog } = UserLogs();
  const [isBookmark, setIsBookmark] = useState(bookmark ? true : false);
  const [isLogged, setIsLogged] = useState(log ? true : false);
  const [isLiked, setIsLiked] = useState(log?.liked_it ? true : false);
  const [hasShared, setHasShared] = useState<boolean>(false);

  let availabilityMsg = 'Now Available!';
  let availModifier = '';
  
  const currentDate: Date = new Date();
  const currentDateNum = currentDate.getTime();
  const oneDay: number = 24 * 60 * 60 * 1000;

  const setStartDate = (date: string) => {
    const offerStartDate: Date = new Date(date);
    const offerStartNum = offerStartDate.getTime();
    const daysSinceStart: number = Math.floor((currentDateNum - offerStartNum) / oneDay);
    
    availabilityMsg = `Available on ${offerStartDate.toLocaleDateString()}`;
    
    if (daysSinceStart >= 0) {
      if (daysSinceStart < 4) {
        availModifier += ' new'
        availabilityMsg = "New release!"
      }

      if (!product.end_date && daysSinceStart > 4) {
        availModifier += ' while-supplies';
        availabilityMsg = "Available while supplies last!";
        const weeks = Math.floor(daysSinceStart / 7);
        if (weeks < 1) {
          availabilityMsg = `While supplies last!\n(released this week)`;
        } else if (weeks === 1) {
          availabilityMsg = `While supplies last!\n(released last week)`;
        } else {
          availabilityMsg = `While supplies last!\n(released ${weeks} weeks ago)`;
        }
      } else if (product.end_date) {
        setEndDate(product.end_date);
      }
    }
  };

  const setEndDate = (date: string) => {
    const offerEndDate: Date = new Date(date);
    const offerEndNum = offerEndDate.getTime();
    const daysBeforeEnd: number = Math.ceil((offerEndNum - currentDateNum) / oneDay);

    if (daysBeforeEnd >= 0) {
      if (daysBeforeEnd < 6) {
        availModifier += ' ending';
        if (daysBeforeEnd === 1) {
          availabilityMsg = 'Only available for one more day!';
        } else {
          availabilityMsg = `Only available for ${daysBeforeEnd} more days!`;
        }
      } else {
        availModifier += ' midlife';
        availabilityMsg = `Available until ${offerEndDate.toLocaleDateString()}`;
      }
    } else {
      availModifier += ' ended';
      availabilityMsg = 'No longer available.';
    }
  };

  if (product.start_date) {
    setStartDate(product.start_date);
  } else if (product.end_date) {
    setEndDate(product.end_date);
  }

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': auth?.csrftoken ?? ''
  };

  const addBkmarkHandler = () => {
    axios.post(`/api/users/${auth?.user.uuid}/bookmarks/new/`,
      { product: product.id },
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
  
  const clickBkmarkHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!auth?.user?.uuid) {
      navigate('/login');
      return;
    }
    if (isBookmark) {
      deleteBkmarkHandler();
    } else {
      addBkmarkHandler();
    }
    setIsBookmark(!isBookmark);
  };

  const addLogHandler = () => {
    axios.post(`/api/users/${auth?.user.uuid}/logs/new/`,
      { product: product.id },
      { headers: headers }
    )
    .then((response) => {
      addLog(response.data);
    })
    .catch((err) => console.log('😈', err));
  };

  const deleteLogHandler = () => {
    axios.delete(`/api/users/${auth?.user.uuid}/logs/${log!.id}/deletion/`,
      { headers: headers }
    )
    .then(() => {
      removeLog(log!.product);
      setIsLiked(false);
    })
    .catch((err) => console.log('😈', err));
  };

  const clickLogHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!auth?.user?.uuid) {
      navigate('/login');
      return;
    }
    if (isLogged) {
      deleteLogHandler();
    } else {
      addLogHandler();
    }
    setIsLogged(!isLogged);
  };

  const clickLikeHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    const workingLog = log!;
    workingLog.liked_it = !isLiked;
    axios.patch(`/api/users/${auth?.user.uuid}/logs/${log!.id}/edit/`, 
      workingLog,
      { headers: headers }
    )
    .then(() => {
      editLog(workingLog);
      setIsLiked(!isLiked);
    })
  };

  const clickProductHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    if (product.link_url) {
      window.open(product.link_url, '_blank');
    }
  };

  const handleShareClick: React.MouseEventHandler<HTMLDivElement> = async () => {
    const projectURL = 'https://oriori.fly.dev/home';
    try{
        if(navigator.share){
          await navigator.share({
            title: `${product.product_name}`,
            text: `${product.id}:${product.product_name}`,
            url: `${projectURL}#${product.id}`,
          })
        } else {
          const shareURL = `${projectURL}#${product.id}`;
            await navigator.clipboard.writeText(shareURL);
            console.log("💌",product.id, ":", product.product_name,":", shareURL);
        }
        setHasShared(true);
        setTimeout(() => {
          setHasShared(false);
        }, 3000);
      } catch (error){
        console.error("💩",error);
    }
  } 
  
  return (
    <div className='product__card' id={`${product.id}`}>
      <div className='product__title' onClick={ clickProductHandler }>
        <h2 className='product__name'>
          { product.product_name }
        </h2>
        <div className={ 'product__avail-container' + availModifier }>
          <p className={ 'product__avail-text' + availModifier }>
            { availabilityMsg }
          </p>
        </div>
      </div>
      <div className='product__content'>
        <div className='product__img-container' onClick={ clickProductHandler }>
          { product.img_url ? <img className='product__img' src={ product.img_url } alt={ product.product_name }/> : <></> }
        </div>
        <div className='product__button-container'>
          <BkmarkButton isBookmark={ isBookmark } clickHandler={ clickBkmarkHandler }/>
          <LogButton isLogged={ isLogged } clickHandler={ clickLogHandler }/>
          { isLogged && <LikeButton isLiked={ isLiked } clickHandler={ clickLikeHandler }/> }
          <ShareButton hasShared={hasShared} clickHandler={handleShareClick} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;