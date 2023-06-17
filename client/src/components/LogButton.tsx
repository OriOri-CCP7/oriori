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
    <div className='log__button' onClick={ clickHandler }>
      {
        isLogged
          ? <CheckCircleIcon className="log__icon--solid"/>
          : <PlusCircleIcon className="log__icon--outline"/>
      }
    </div>
  );
};

export default LogButton;