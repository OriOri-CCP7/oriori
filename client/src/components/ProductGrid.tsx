import React from 'react';
import { UserFavs } from '../context/FavContext';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from './ProductCard';
import { UserReviews } from '../context/ReviewContext';
import {styled, makeStyles } from '@mui/material/styles';

type cssClass = {
  height: number | string | undefined,
  width: number | string | undefined,
  padding: number | string | undefined,
  margin: number | string | undefined,
  backgroundColor: string | undefined,
  color: string | undefined
}


interface Props {
  productArray: Array<Product>,
};


  
function ProductGrid({ productArray }: Props) {
  const { favorites, isLoadingFavs } = UserFavs();
  const { reviews, isLoadingRevs } = UserReviews();
  console.log("🥰", favorites);

  const cssMakeStyles = makeStyles((theme: cssClass) => ({
    myClass: {
      height: theme.height,
      width: theme.width,
      padding: theme.padding,
      margin: theme.margin,
      backgroundColor: theme.backgroundColor,
      color: theme.color,
    },
  }));

  

  return (
    <>
    <div className="Grid">
      <Grid container rowSpacing={1}>
          {(!isLoadingFavs && !isLoadingRevs) && productArray.map((product) => (
              <Grid xs={6} key={product.product_name}>
                  <ProductCard 
                    product={product}
                    favorite={favorites[product.id.toString()]}
                    review={reviews[product.id.toString()]}
                    />
              </Grid>
          ))}
      </Grid>
    </div>
    </>
  );
}

export default ProductGrid;