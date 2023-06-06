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
    {value:0, text:"Coming Soon", color:"grey"},
    {value:1, text:"Fresh Item!", color:"paleturquoise"},
    {value:2, text:"Available Now!", color: "grey"},
    {value:3, text:"Ending Soon", color: "red"},
    {value:4, text:"Expired", color:"grey"}
];


const Card :React.FC<Props> = ({className, img_url, productName, offerStart, offerEnd, favoriteNumber, onClick}) => {
    const current :Date = new Date();
    const currentYear: number = current.getFullYear();
    const currentMonth: string = (current.getMonth() + 101).toString().substring(1);
    const currentDate:string = (current.getDate() + 100).toString().substring(1);
    const [ offerEnds, setOfferEnds ] = useState<string>(offerEnd);
    const [ offerStarts, setOfferStarts ] = useState<string>(offerStart);
    useEffect(()=> {
        if(offerEnds === "null" || offerEnds === "undefined"){
            setOfferEnds(`${(currentYear + 100).toString()}-${currentMonth}-${currentDate}`);
        }
        if(offerStarts === "undefined" || offerStarts === "null"){
            setOfferStarts(`${currentYear}-${currentMonth}-${currentDate}`)
        }
        
    }, []);
    
    
    // For card color 
    const offerEndDate: Date = new Date(offerEnds);
    const offerStartDate: Date = new Date(offerStarts);
    const oneDay: number = 24 * 60 * 60 * 1000;
    // const diffInEndDays: number = Math.round(Math.abs((offerEndDate.getTime() - current.getTime()) / oneDay));
    // const diffInStartDays: number = Math.round(Math.abs((offerStartDate.getTime() - current.getTime()) / oneDay));
    const diffInStartAndEndDays: number = Math.round(Math.abs((offerEndDate.getTime() - offerStartDate.getTime()) / oneDay)); // promotion period date

    
/*
    console.log("🤡 productName:", productName);
    console.log("👋 offerEndDate:", offerEndDate);
    console.log("💚 offerStartDate:", offerStartDate);
    console.log("🙀 offerEnds:", offerEnds, "day");
    console.log("💗 offerStarts:", offerStarts, "day");
    console.log("😆 diffInEndDays:",diffInEndDays, "days");
    console.log("🥵 diffInStartDays:",diffInStartDays, "day");
    console.log("👿 diffInStartAndEndDays:",diffInStartAndEndDays, "day");
    */

    const normalBgcolor = "grey";
    const freshItemBgcolor = "paleturquoise";
    const lastDayBgcolor = "red";

    const [ bgcolor, setBgcolor ] = useState<string>(normalBgcolor);

    
    

   

    const styles = {
        backgroundColor: bgcolor
    };
    useEffect(() => {
        // handle card color
        // Is it the promotion period yet? is it within the promotion period? is it outside the promotion period?
        if(diffInStartAndEndDays< 11){
            if(diffInStartAndEndDays < 1){ 
                const pattern = innerPattern(0,0,1);
                // grey, 1 x red, grey 
                // no middle grey, no green
                // 1 block only - current day = red
            } else if (diffInStartAndEndDays < 8 ){
                const pattern = innerPattern(0,0,diffInStartAndEndDays);
                // grey, 1-7x red, grey
                // no middle grey, no green
                // 7 block only
            } else { 
                const pattern = innerPattern(diffInStartAndEndDays - 7, 0, 7);
                //(diffInStartAndEndDays < 11)
                // grey, 1-3x green, 7x red, grey
                // might overlap with green, when green does overlap with red, red prevail
            }
        } else if (diffInStartAndEndDays >= 11){
            const pattern = innerPattern(3,diffInStartAndEndDays - 10,7);
            const checkRange1 = Math.round((offerStartDate.getTime() - current.getTime())/oneDay ) > 0;
            const checkRange2 = Math.round((offerEndDate.getTime() - current.getTime())/oneDay ) > 0;
            if(checkRange1){
                setBgcolor(normalBgcolor);
                setAvailableMessage(availability[0].text)
            }
            // grey, 3x green, any number of grey, 7x red, grey
        }
        

    }, []);
    function innerPattern(green:number, grey:number, red:number){
        return {green, grey, red};
    }
    /* WIP  
    
    // To next person: 
    // I was thinking using two for loop for the innerPattern period. My intention was for(const color in obj){ for( let i=0; i< obj[color].value; i++){ ... } } and 'break' the for loop once the code reached today date and return that color. 
    // But I would leave the discrition to whoever picking that job up.

    function todayColor(obj:{green:number, grey:number, red:number}){
        type Obj = {
            green: number,
            grey:number,
            red:number
        }
        let day:number = 0;
        for(let color in obj){
            day = day + obj[color];
        }
        return day;
    }
    function forLoop(value:number){
        if(!value) return 0
        for(let i= 0;i<  value; i++){

        }
    }
    */
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