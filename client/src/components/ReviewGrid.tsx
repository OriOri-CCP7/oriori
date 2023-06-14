import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ReviewCard from './ReviewCard';

interface Props {
  productArray: Array<Product>,
  reviewObj: { [key: number]: Review }
};

function ReviewGrid({ productArray, reviewObj }: Props) {

  return (
    <div className="Grid">
      <Grid container rowSpacing={1}>
        {
          productArray.map((product) => (
            <Grid xs={6} key={product.product_name}>
              <ReviewCard product={ product } review={ reviewObj[product.id] }/>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default ReviewGrid;