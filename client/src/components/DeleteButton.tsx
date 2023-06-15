import React from 'react'
import { TrashIcon } from '@heroicons/react/24/solid';
import './DeleteButton.css';

interface Props {
  clickHandler: React.MouseEventHandler<HTMLDivElement>
};

function DeleteButton({ clickHandler }: Props) {
  return (
    <div className='delete-button' onClick={ clickHandler }>
      <TrashIcon/>
    </div>
  );
};

export default DeleteButton;