import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card';
import React from 'react';


interface Props {
    productArray: Array<Product>,
    setProductArray: React.Dispatch<React.SetStateAction<Array<Product>>> | null
  }

function GridComponent({ productArray, setProductArray }: Props) {
    return (
      <div className="Grid">
        <Grid container rowSpacing={1}>
            {productArray.map((product) => (
                <Grid xs={6} key={product.product_name}>
                    <Card 
                      className="productCard"
                      productName={product.product_name}
                      img_url={""}
                      offerStart={product.start_date}
                      offerEnd={product.end_date}
                      favoriteNumber={0} 
                      onClick={() => {}}/>
                </Grid>
            ))}
        </Grid>
      </div>
    );
  }
  
  export default GridComponent;
  