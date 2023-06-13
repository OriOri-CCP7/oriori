import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import './ReviewButton.css';

function ReviewButton() {
  const navigate = useNavigate();
  return (
    <div className='reviewButton' onClick={ () => navigate("/new-review") }>
      <PencilSquareIcon/>
    </div>
  );
;}

export default ReviewButton;