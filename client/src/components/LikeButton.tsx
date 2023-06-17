import React from 'react'
import { HandThumbUpIcon as LikeSolid } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as LikeOutline } from '@heroicons/react/24/outline';
import './LikeButton.css';

interface Props {
  isLiked: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function LikeButton({ isLiked, clickHandler }: Props) {
  
  return (
    <div className='like__button' onClick={ clickHandler }>
      {
        isLiked
          ? <LikeSolid className="like__icon--solid"/>
          : <LikeOutline className="like__icon--outline"/>
      }
    </div>
  );
};

export default LikeButton;