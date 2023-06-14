import React from 'react'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import './FavButton.css';

interface Props {
  isFavorite: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function FavButton({ isFavorite, clickHandler }: Props) {
  
  return (
    <div className='favoriteButton' onClick={ clickHandler }>
      {
        isFavorite
        ? 
        // <>
        // <span className="container-heartsolid">
          <HeartSolid className="favorited-icon"/>
          // </span> 
          // </>
        : 
        // <>
        // <span className="container-heartoutline">
          <HeartOutline className="unfavorited-icon"/>
          // </span>
          // </>
      }
    </div>
  );
;}

export default FavButton;