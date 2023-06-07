import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card';
import React from 'react';

interface ProductObj {
    className: string | undefined, 
    productName: string,
    img_url: string | undefined,
    offerStart: string,
    offerEnd: string, 
    favoriteNumber: number, 
    onClick: (event: React.MouseEvent<HTMLElement>) => void
}

interface Props {
    productArray: Array<ProductObj>,
    setProductArray: React.Dispatch<React.SetStateAction<Array<ProductObj>>>
  }

function GridComponent({ productArray, setProductArray }: Props) {
    return (
      <div className="Grid">
        <Grid container rowSpacing={1}>
            {productArray.map((data) => (
                <Grid xs={6} key={data.productName}>
                    <Card 
                    className={data.productName}
                    productName={data.productName}
                    img_url={data.img_url}
                    offerStart={data.offerStart}
                    offerEnd={data.offerEnd}
                    favoriteNumber={data.favoriteNumber} 
                    onClick={data.onClick}/>
                </Grid>
            ))}
        </Grid>
      </div>
    );
  }
  
  export default GridComponent;
  