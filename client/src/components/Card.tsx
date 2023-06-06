import React from 'react';

import { useState, useEffect } from 'react';
import './Card.css';

type  Props = {
    className: string | undefined, 
    productName: string,
    img_url: string | undefined,
    offerStart: string,
    offerEnd: string, 
    favoriteNumber: number, 
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}


const Card :React.FC<Props> = ({className, img_url, productName, offerStart, offerEnd, favoriteNumber, onClick}) => {

    const currentDate: Date = new Date();
    const offerEndDate: Date = new Date(offerEnd);
    const offerStartDate: Date = new Date(offerStart);

    const currentDateNum = currentDate.getTime();
    const offerEndNum = offerEndDate.getTime();
    const offerStartNum = offerStartDate.getTime();
    const oneDay: number = 24 * 60 * 60 * 1000;

    const offerLength: number = Math.round(Math.abs((offerEndNum - offerStartNum) / oneDay));
    const daysSinceStart: number = Math.floor((currentDateNum - offerStartNum) / oneDay);
    const daysBeforeEnd: number = Math.ceil((offerEndNum - currentDateNum) / oneDay);

    const handleFavorite: ()=> void = () => {
        // fixme: how do we check if user has favour the card already or not?
        if(!addLove){
            setAddLove(true);
        } else {
            setAddLove(false);
        }
    }

    let cardClass = "productCard ";
    if (daysSinceStart >= 0) {
        if (daysBeforeEnd < 6) {
            cardClass += "ending";
        } else if (daysSinceStart < 4) {
            cardClass += "new"
        }
    }
    
    const [ addLove, setAddLove ] = useState<boolean>(false);

    return (
        <div className={cardClass}>
            <div className="productImg">
                { (img_url) ? <img src={img_url} alt={img_url} /> : <></> }
            </div>
            <div className="productName">
                {productName}
            </div>
            <div className="offerStart">
                {`Offer start: ${offerStartDate.toLocaleDateString()}`}
            </div>
            <div className="offerEnd">
                {`Offer end: ${offerEndDate.toLocaleDateString()}`}
            </div>
            <button
                className="favoriteAdd"
                onClick={handleFavorite}
                >
                    {`❤️`}
            </button>
        </div>

    )
}

export default Card;