import React from 'react'
import { CheckCircleIcon as CheckSolid } from '@heroicons/react/24/solid';
import { CheckCircleIcon as CheckOutline } from '@heroicons/react/24/outline';

import '../styles/LogButton.css';

interface Props {
  isLogged: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function LogButton({ isLogged, clickHandler }: Props) {
  return (
    <div className='product__button' onClick={ clickHandler }>
      {
        isLogged
          ? <CheckSolid className="product__icon log__icon solid"/>
          : <CheckOutline className="product__icon log__icon outline"/>
          
      }
      {
        isLogged
          ? 'Tried it!'
          : 'Tried it?'
      }
    </div>
  );
};

export default LogButton;