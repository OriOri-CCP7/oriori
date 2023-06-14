import React from 'react';
import { UserFavs } from '../context/FavContext';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from './ProductCard';
import { UserReviews } from '../context/ReviewContext';

interface Props {
  productArray: Array<Product>,
};

function ProductGrid({ productArray }: Props) {
  const { favorites, isLoadingFavs } = UserFavs();
  const { reviews, isLoadingRevs } = UserReviews();
  console.log("🥰", favorites);

  return (
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
  );
}

export default ProductGrid;