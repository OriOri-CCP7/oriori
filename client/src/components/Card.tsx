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
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
    
}

const availability = [
    {value:0, text:"Not Yet Available"},
    {value:1, text:"Fresh Item!"},
    {value:2, text:"Available Now!"},
    {value:3, text:"Ending Soon"},
    {value:4, text:"No Longer Available"}
]

const Card :React.FC<Props> = ({className, img_url, productName, offerStart, offerEnd, favoriteNumber, onClick}) => {

    const time :Date = new Date();
    const timeYear: number = time.getFullYear();
    const timeMonth: string = (time.getMonth() + 101).toString().substring(1);
    const timeDate:string = (time.getDate() + 100).toString().substring(1);
    
    const [ offerEnds, setOfferEnds ] = useState<string>(offerEnd);
    const [ offerStarts, setOfferStarts ] = useState<string>(offerStart);
    
    if(offerEnds === "null" || offerEnds === "undefined"){
        setOfferEnds(`${(timeYear + 100).toString()}-${timeMonth}-${timeDate}`);
    }
    if(offerStarts === "undefined" || offerStarts === "null"){
        setOfferStarts(`${timeYear}-${timeMonth}-${timeDate}`)
    }
    const offerEndDate: Date = new Date(offerEnds)
    const offerStartDate: Date = new Date(offerStarts);
        
    // For card color
    const currentDate: Date = new Date();
    const oneDay: number = 24 * 60 * 60 * 1000;
    const diffInEndDays: number = Math.round(Math.abs((offerEndDate.getTime() - currentDate.getTime()) / oneDay));
    const diffInStartDays: number = Math.round(Math.abs((offerStartDate.getTime() - currentDate.getTime()) / oneDay));
    const diffInStartAndEndDays: number = Math.round(Math.abs((offerEndDate.getTime() - offerStartDate.getTime()) / oneDay));

    console.log("🤡 productName:", productName);
    console.log("👋 offerEndDate:", offerEndDate);
    console.log("💚 offerStartDat:", offerStartDate);
    console.log("🙀 offerEnds:", offerEnds);
    console.log("💗 offerStarts:", offerStarts);
    console.log("😆 diffInEndDays:",diffInEndDays);
    console.log("🥵 diffInStartDays:",diffInStartDays);
    console.log("👿 diffInStartAndEndDays:",diffInStartAndEndDays);
    const normalBgcolor = "grey";
    const freshItemBgcolor = "paleturquoise";
    const lastDayBgcolor = "red";
    const [ bgcolor, setBgcolor ] = useState<string>(normalBgcolor);
    const [isPromotion, setIsPromotion] = useState<boolean>(false);
    const [isStartThreeDays, setIsStartThreeDays ] = useState<boolean>(false);
    const [isLastWeek, setIsLastWeek] = useState<boolean>(false); 

    const styles = {
        backgroundColor: bgcolor
    };
    useEffect(() => {
        // handle card color
        // Is it the promotion period yet? is it within the promotion period? is it outside the promotion period?
        if(currentDate.getTime() > offerStartDate.getTime()){
            setIsPromotion(false);
            setBgcolor(normalBgcolor);
            setAvailableMessage(availability[0].text);
        } else if (currentDate.getTime() <= offerStartDate.getTime() && currentDate.getTime() >= offerEndDate.getTime()){
            if(diffInEndDays <=3){
                setIsPromotion(true);
                setBgcolor(freshItemBgcolor);
                setAvailableMessage(availability[1].text);
            } else if (diffInStartDays <=7){
                setIsPromotion(true);
                setBgcolor(lastDayBgcolor);
                setAvailableMessage(availability[3].text);
            } else if (currentDate.getTime()){

            } else {
                setIsPromotion(true);
                setBgcolor(normalBgcolor);
                setAvailableMessage(availability[2].text);
            }
        } else if (currentDate.getTime() > offerEndDate.getTime()){
            setIsPromotion(false);
            setBgcolor(normalBgcolor);
            setAvailableMessage(availability[4].text);
        }
        // if(diffInEndDays <= 7){ 
            
        //     // if there are conflicting end period and starting period
        //     // The fresh period should prevail
        //     // setBgcolor(freshItemBgcolor); 
        //     // setAvailableMessage(availability[3].text);
            
            
        //     setBgcolor(lastDayBgcolor);
        //     setAvailableMessage(availability[1].text);
            
        // } else if (diffInEndDays >7) {
        //     if(diffInStartAndEndDays >= 3){
        //         setBgcolor(freshItemBgcolor); 
        //         setAvailableMessage(availability[3].text);
        //     }else {
                
                
        //         setBgcolor(normalBgcolor);
        //         setAvailableMessage(availability[2].text);
        //     }
        // }

    }, []);
    
    
    const handleFavorite: ()=> void = () => {
        // fixme: how do we check if user has favour the card already or not?
        if(!addLove){
            setCounter(counter + 1);
            setAddLove(true);
        } else {
            setCounter(counter - 1);
            setAddLove(false);
        }
    }
    
    const [ addLove, setAddLove ] = useState<boolean>(false);
    const [ counter, setCounter ] = useState<number>(favoriteNumber);
    
    // For card message
    const [ availableMessage, setAvailableMessage ] = useState<string>(availability[0].text);
    


    return (
        <div>
            <div className="cardName" 
            // onLoad={handleOffer}
            style={styles}
            >
                <div className="imageURL">
                    { (img_url) ? <><img src={img_url} alt={img_url} /></> : <></> }
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
                <div className="availableMessage">
                    {`${availableMessage}`}
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