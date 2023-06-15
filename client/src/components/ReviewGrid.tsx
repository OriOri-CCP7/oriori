import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { UserReviews } from '../context/ReviewContext';
import ReviewCard from './ReviewCard';

interface Props {
  productArray: Array<Product>
};

function ReviewGrid({ productArray }: Props) {
  const { reviews, isLoadingRevs } = UserReviews();
  return (
    <div className="Grid">
      <Grid container rowSpacing={1}>
        {
          productArray.map((product) => (
            <Grid xs={6} key={product.product_name}>
              { !isLoadingRevs && <ReviewCard product={ product } review={ reviews[product.id] }/> }
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default ReviewGrid;