import React from 'react'
import { HandThumbUpIcon as LikeSolid } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as LikeOutline } from '@heroicons/react/24/outline';
// import '../styles/Icons.css';
// import '../styles/Button.css';

import '../styles/LikeButton.css';

interface Props {
  isLiked: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function LikeButton({ isLiked, clickHandler }: Props) {
  
  return (
    <div className='product__button' onClick={ clickHandler }>
      {
        isLiked
          ? <LikeSolid className="product__icon like__icon solid"/>
          : <LikeOutline className="product__icon like__icon outline"/>
      }
      {
        isLiked
          ? 'Liked it!'
          : 'Like'
      }
    </div>
  );
};

export default LikeButton;