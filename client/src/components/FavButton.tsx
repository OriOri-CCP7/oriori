import React from 'react'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

interface Props {
  isFavorite: boolean,
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
}

function FavButton({ isFavorite, setIsFavorite }: Props) {
  const clickHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsFavorite(!isFavorite);
  }
  
  return (
    <div className='favoriteButton' onClick={ clickHandler }>
      {
        isFavorite
        ? <HeartSolid/>
        : <HeartOutline/>
      }
    </div>
  )
}

export default FavButton