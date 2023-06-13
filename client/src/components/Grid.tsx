import React from 'react';
import { UserFavs } from '../context/FavContext';
import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card';

interface Props {
  productArray: Array<Product>,
};

function GridComponent({ productArray }: Props) {
  let { favorites, isLoadingFavs } = UserFavs();
  console.log("🥰", favorites);

  return (
    <div className="Grid">
      <Grid container rowSpacing={1}>
          {!isLoadingFavs && productArray.map((product) => (
              <Grid xs={6} key={product.product_name}>
                  <Card 
                    product={product}
                    favorite={favorites[product.id.toString()]}
                    />
              </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default GridComponent;