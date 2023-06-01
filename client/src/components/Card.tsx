import React from 'react';
import { useEffect, useRef, useState } from 'react';

type Props = {
    className: string, 
    productName: string,
    offerStart: {
        timestamp: number, 
        year:number, 
        month:number, 
        day:number
    },
    offerEnd: {
        timestamp: number, 
        year:number, 
        month:number, 
        day:number
    }, 
    favourNumber: number, 
    onClick: (fn: ({})), 
    onChange: (fn: {{}})
}

const Card :React.FC<Props> = (Props) => {
    return ()
}

