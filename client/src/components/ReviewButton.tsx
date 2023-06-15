import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import './ReviewButton.css';

interface Props {
  productId: number,
  review?: Review
};

function ReviewButton({ productId, review }: Props) {
  const navigate = useNavigate();
  const navPath = review ? `/${productId}/edit-review` : `/${productId}/new-review`
  return (
    <div className='review-button' onClick={ () => navigate(navPath) }>
      <PencilSquareIcon/>
    </div>
  );
};

export default ReviewButton;