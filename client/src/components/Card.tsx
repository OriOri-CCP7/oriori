import React from 'react';
import { useState } from 'react';
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

    // const handleStartDate = () => {}
    // const handleEndDate = () => {}
    const handleFavorite = () => {
        // fixme: how do we check if user has favour the card already or not?
        if(!addLove){
            setCounter(counter + 1);
            setAddLove(true);
        } else {
            setCounter(counter - 1);
            setAddLove(false);
        }
        
        
    }
    const [ counter, setCounter ] = useState<number>(favoriteNumber);

    const [ addLove, setAddLove ] = useState<boolean>(false)
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
                    <button
                    className="favoriteAdd"
                    onClick={handleFavorite}
                    >{`❤️ ${counter}`}
                    </button>
                   
                    
                </div>
            </div>
        </div>

    )
}

export default Card;