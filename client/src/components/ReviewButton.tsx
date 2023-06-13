import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import './ReviewButton.css';

interface Props {
  productId: number
};

function ReviewButton({ productId }: Props) {
  const navigate = useNavigate();
  return (
    <div className='reviewButton' onClick={ () => navigate(`/${productId}/new-review`) }>
      <PencilSquareIcon/>
    </div>
  );
;}

export default ReviewButton;