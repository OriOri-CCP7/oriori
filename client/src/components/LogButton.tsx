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
    <div role="switch" aria-checked={isLogged} className='product__button' onClick={ clickHandler }>
      {
        isLogged
          ? <CheckSolid role="img" className="product__icon log__icon solid"/>
          : <CheckOutline role="img" className="product__icon log__icon outline"/>
          
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