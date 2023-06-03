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
    {value:0, text:"Item No Longer Available"},
    {value:1, text:"Ending Soon!"},
    {value:2, text:"Available Now"},
    {value:3, text:"Fresh Item"},
    {value:4, text:"TBA"}
]


const Card :React.FC<Props> = ({className, img_url, productName, offerStart, offerEnd, favoriteNumber, onClick}) => {
/**
 * function formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
}
 */
    const time :Date = new Date();
    const [timeYear, setTimeYear] = useState<string>(time.getFullYear().toString())
    // let timeYear: string = time.getFullYear().toString();
    const [timeMonth,setTimeMonth] = useState<string>((time.getMonth() + 101).toString().substring(1))
    //let timeMonth: string = (time.getMonth() + 1).toString();
    // let timeDate: string = time.getDate().toString();
    const [timeDate, setTimeDate] = useState<string>((time.getDate() + 100).toString().substring(1))

    const [ offerEnds, setOfferEnds ] = useState<string>(offerEnd);
    const [ offerStarts, setOfferStarts ] = useState<string>(offerStart);
    useEffect(() => {
        
        if(offerEnds === "TBA" || offerEnds === undefined){
            setOfferEnds("2123-06-03");
        }
        if(offerStarts === undefined || offerStarts === "TBA"){
            setOfferStarts(`${timeYear}-${timeMonth}-${timeDate}`)
        }
        const offerEndDate: Date = new Date(offerEnds)
        const offerStartDate: Date = new Date(offerStarts);
        const currentDate: Date = new Date();
        const oneDay: number = 24 * 60 * 60 * 1000;
        const diffInEndDays: number = Math.round(Math.abs((offerEndDate.getTime() - currentDate.getTime()) / oneDay));
        const diffInStartDays: number = Math.round(Math.abs((offerStartDate.getTime() - currentDate.getTime()) / oneDay));
        const diffInStartAndEndDays: number = Math.round(Math.abs((offerEndDate.getTime() - offerStartDate.getTime()) / oneDay));
        console.log("🤡", productName);
        console.log("🙀", offerEnds);
        console.log("💗", offerStarts);
        console.log("😆",diffInEndDays);
        console.log("🥵",diffInStartDays);
        console.log("👿",diffInStartAndEndDays);
        if(diffInEndDays <= 7){
            if(diffInStartAndEndDays <= 3){
                setBgcolor(freshItemBgcolor);
                setAvailableMessage(availability[3].text);
            } else {
                setBgcolor(lastDayBgcolor);
                setAvailableMessage(availability[1].text);
            }
        } else if (diffInStartDays <=3){
            setBgcolor(freshItemBgcolor);
            setAvailableMessage(availability[3].text)
        } else {
            

            setBgcolor(normalBgcolor);
            setAvailableMessage(availability[2].text);
        }
    }, [])
    const normalBgcolor = "grey";
    const freshItemBgcolor = "paleturquoise";
    const lastDayBgcolor = "red";
    
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

    // const handleOffer = () => {
    //     const offerEndDate: Date = new Date(offerEnd);
    //     const currentDate: Date = new Date();
    //     const oneDay: number = 24 * 60 * 60 * 1000;
    //     const diffInDays: number = Math.round(Math.abs((offerEndDate.getTime() - currentDate.getTime()) / oneDay));
    //     console.log("😆",diffInDays);

    //     if(diffInDays <= 7){
            
    //         setIsLastWeek(true);
    //     } 

        

    // }
    const [ counter, setCounter ] = useState<number>(favoriteNumber);

    const [ addLove, setAddLove ] = useState<boolean>(false);

    // const [ isLastWeek, setIsLastWeek ] = useState<boolean>(false);

    const [ availableMessage, setAvailableMessage ] = useState<string>(availability[0].text)

    const [ bgcolor, setBgcolor ] = useState<string>("");
    
    const styles = {
        backgroundColor: bgcolor
    };
    return (
        <div>
            <div className="cardName" 
            // onLoad={handleOffer}
            style={styles}
            >
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