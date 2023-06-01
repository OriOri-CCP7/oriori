import React from 'react';
import { useEffect, useRef, useState } from 'react';
import './Card.css';

type  Props = {
    className: string | undefined, 
    productName: string,
    img_url: string | undefined,
    offerStart: string,
    offerEnd: string, 
    favoriteNumber: number, 
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    
}

const Card :React.FC<Props> = ({className, img_url, productName, offerStart, offerEnd, favoriteNumber, onClick}) => {

    const handleStartDate = () => {}
    const handleEndDate = () => {}
    const handleFavorite = () => {
        setCounter(counter + 1);
    }
    const [ counter, setCounter ] = useState(125);
    return (
        <div>
            <div className="cardName">
                <div className="imageURL">
                    <img src={img_url} alt={img_url} />
                </div>
                <div className="productName">
                    {productName}
                </div>
                <div className="offerStart">
                    {`Offer start in : ${offerStart}`}
                </div>
                <div className="offerEnd">
                    {`Offer end in : ${offerEnd}`}
                </div>
                <div className="favoriteNumber">
                    <a onClick={handleFavorite}>{counter}</a>
                    {`❤️ ${favoriteNumber}`}
                </div>
            </div>
        </div>

    )
}

export default Card;