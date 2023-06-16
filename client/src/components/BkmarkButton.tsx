import React from 'react'
import { BookmarkIcon as BkmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BkmarkOutline } from '@heroicons/react/24/outline';
import './BkmarkButton.css';

interface Props {
  isBookmark: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function BkmarkButton({ isBookmark, clickHandler }: Props) {
  
  return (
    <div className='bookmark-button' onClick={ clickHandler }>
      {
        isBookmark
          ? <BkmarkSolid className="icon--solid"/>
          : <BkmarkOutline className="icon--outline"/>
      }
    </div>
  );
};

export default BkmarkButton;