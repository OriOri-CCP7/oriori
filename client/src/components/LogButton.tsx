import React from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import './LogButton.css';

interface Props {
  isLogged: boolean,
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function LogButton({ isLogged, clickHandler }: Props) {
  return (
    <div className='product__button' onClick={ clickHandler }>
      {
        isLogged
          ? <CheckCircleIcon className="product__icon log__icon solid"/>
          : <PlusCircleIcon className="product__icon log__icon outline"/>
          
      }
      {
        isLogged
          ? 'Tried it!'
          : 'Add'
      }
    </div>
  );
};

export default LogButton;