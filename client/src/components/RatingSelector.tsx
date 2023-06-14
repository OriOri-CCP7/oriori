import React, { SetStateAction } from 'react';
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid
} from '@heroicons/react/24/solid';
import {
  HandThumbUpIcon as HandThumbUpOutline,
  HandThumbDownIcon as HandThumbDownOutline
} from '@heroicons/react/24/outline';
import './RatingSelector.css';

interface Props {
  rating: 0 | 1 | 2,
  setRating: React.Dispatch<SetStateAction<0 | 1 | 2>>,
  disabled?: true
};

function RatingSelector({ rating, setRating, disabled }: Props) {
  const handleClickDown = () => {
    if (disabled) return;
    setRating(
      rating === 1
        ? 0
        : 1
    );
  };

  const handleClickUp = () => {
    if (disabled) return;
    setRating(
      rating === 2
        ? 0
        : 2
    );
  };
  
  const generateButtons = () => {
    switch (rating) {
      case 0:
        return (
          <>
            <HandThumbUpOutline onClick={ handleClickUp } className="rating-button"/>
            <HandThumbDownOutline onClick={ handleClickDown } className="rating-button"/>
          </>
        );
      case 1:
        return (
          <>
            <HandThumbUpOutline onClick={ handleClickUp } className="rating-button"/>
            <HandThumbDownSolid onClick={ handleClickDown } className="rating-button"/>
          </>
        );
      case 2:
        return (
          <>
            <HandThumbUpSolid onClick={ handleClickUp } className="rating-button"/>
            <HandThumbDownOutline onClick={ handleClickDown } className="rating-button"/>
          </>
        );
    }
  };
  
  return (
    <div className="rating-selector">
      {
        generateButtons()
      }
    </div>
  )
};

export default RatingSelector;