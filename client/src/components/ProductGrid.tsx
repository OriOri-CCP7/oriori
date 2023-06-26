import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { UserBkmarks } from '../context/BkmarkContext';
import { UserLogs } from '../context/LogContext';
import ProductCard from './ProductCard';

import '../styles/ProductGrid.css';

interface Props {
  productArray: Array<Product>,
};

  
function ProductGrid({ productArray }: Props) {
  
  const { bookmarks, isLoadingBkmarks } = UserBkmarks();
  const { logs, isLoadingLogs } = UserLogs();

  return (
    <>
      <div className="Grid">
        <Grid container spacing={0} columnGap={0}>
          {(!isLoadingBkmarks && !isLoadingLogs)
            ? productArray.map((product) => (
                <Grid xs={12} md={6} key={product.product_name}>
                  <ProductCard 
                    product={product}
                    bookmark={bookmarks[product.id!.toString()]}
                    log={logs[product.id!.toString()]}
                    />
                </Grid>
              ))
            : 'Loading...'
          }
        </Grid>
      </div>
    </>
  );
}

export default ProductGrid;