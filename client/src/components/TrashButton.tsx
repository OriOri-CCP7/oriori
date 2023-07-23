import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import '../styles/TrashButton.css';

interface Props {
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function TrashButton({ clickHandler }: Props) {
  
  return (
    <div
      className='trash__button' 
      onClick={ clickHandler } >
      <TrashIcon />
    </div>
  )
};

export default TrashButton;