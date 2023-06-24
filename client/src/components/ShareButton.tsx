import React from 'react';
import { ShareIcon } from '@heroicons/react/24/solid'
import '../styles/ShareButton.css';

type Props = {
  hasShared: boolean,
  clickHandler:React.MouseEventHandler<HTMLDivElement>
};


const ShareButton = ( { hasShared, clickHandler }: Props ) => {

  return (
    <div className='product__button share' onClick={ clickHandler }>
      <ShareIcon className='product__icon share__icon'/>
      { hasShared ? 'Link Copied' : null }
    </div>
  );
};

export default ShareButton;