import React from 'react';
import { BookmarkIcon as BkmarkSolid } from '@heroicons/react/24/solid';
import { BookmarkIcon as BkmarkOutline } from '@heroicons/react/24/outline';

import "../styles/BkmarkButton.css";

interface Props {
  isBookmark: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function BkmarkButton({ isBookmark, clickHandler }: Props) {
  
  return (
    <div role="switch" aria-checked={isBookmark} className='bookmark__button' onClick={clickHandler}>
      {
        isBookmark
          ? <BkmarkSolid role="img" className="bookmark__icon solid"/>
          : <BkmarkOutline role="img" className="bookmark__icon outline"/>
      }
    </div>
  );
};

export default BkmarkButton;