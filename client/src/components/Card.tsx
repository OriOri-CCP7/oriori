import React, { useState } from 'react';

import './Card.css';
import FavButton from './FavButton';

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

    const [isFavorite, setIsFavorite] = useState(false);

    const currentDate: Date = new Date();
    const offerEndDate: Date = new Date(offerEnd);
    const offerStartDate: Date = new Date(offerStart);

    const currentDateNum = currentDate.getTime();
    const offerEndNum = offerEndDate.getTime();
    const offerStartNum = offerStartDate.getTime();
    const oneDay: number = 24 * 60 * 60 * 1000;

    // const offerLength: number = Math.round(Math.abs((offerEndNum - offerStartNum) / oneDay));
    const daysSinceStart: number = Math.floor((currentDateNum - offerStartNum) / oneDay);
    const daysBeforeEnd: number = Math.ceil((offerEndNum - currentDateNum) / oneDay);

    let cardClass = "productCard ";
    let availabilityMsg = `Available on ${offerStartDate.toLocaleDateString()}`;
    if (daysSinceStart >= 0) {
        if (daysBeforeEnd < 6) {
            if (daysBeforeEnd >= 0) {
                cardClass += "ending";
                availabilityMsg = `Only available for ${daysBeforeEnd} days!`;
            } else {
                availabilityMsg = "No longer available.";
            }
        } else if (daysSinceStart < 4) {
            cardClass += "new"
            availabilityMsg = "Now available!";
        }
    }

    return (
        <div className={cardClass}>
            <div className="productImg">
                { (img_url) ? <img src={img_url} alt={img_url} /> : <></> }
            </div>
            <div className="productName">
                {productName}
            </div>
            <div className="productAvailMsg">
                {availabilityMsg}
            </div>
            <FavButton isFavorite={isFavorite} setIsFavorite={setIsFavorite}/>
        </div>

    )
}

export default Card;