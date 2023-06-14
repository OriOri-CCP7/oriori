import React, { SetStateAction } from 'react';
import {
  HandThumbUpIcon as HandThumbUpSolid,
  HandThumbDownIcon as HandThumbDownSolid
} from '@heroicons/react/24/solid';
import {
  HandThumbUpIcon as HandThumbUpOutline,
  HandThumbDownIcon as HandThumbDownOutline
} from '@heroicons/react/24/outline';

interface Props {
  rating: 0 | 1 | 2,
  setRating: React.Dispatch<SetStateAction<0 | 1 | 2>>
};

function RatingSelector({ rating, setRating }: Props) {
 
  const handleClickDown = () => {
    setRating(
      rating === 1
        ? 0
        : 1
    )
  };

  const handleClickUp = () => {
    setRating(
      rating === 2
        ? 0
        : 2
    )
  };
  
  const generateButtons = () => {
    switch (rating) {
      case 0:
        return (
          <>
            <HandThumbUpOutline onClick={ handleClickUp }/> <HandThumbDownOutline onClick={ handleClickDown }/>
          </>
        );
      case 1:
        return (
          <>
            <HandThumbUpOutline onClick={ handleClickUp }/> <HandThumbDownSolid onClick={ handleClickDown }/>
          </>
        );
      case 2:
        return (
          <>
            <HandThumbUpSolid onClick={ handleClickUp }/> <HandThumbDownOutline onClick={ handleClickDown }/>
          </>
        );
    }
  };
  
  return (
    <div className="rating-buttons">
      {
        generateButtons()
      }
    </div>
  )
};

export default RatingSelector;