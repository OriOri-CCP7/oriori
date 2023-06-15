import React, {useState, useEffect} from 'react';
import { UserFavs } from '../context/FavContext';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from './ProductCard';
import { UserReviews } from '../context/ReviewContext';
// import {styled, makeStyles } from '@mui/material/styles';

// type cssClass = {
//   height: number | string | undefined,
//   width: number | string | undefined,
//   padding: number | string | undefined,
//   margin: number | string | undefined,
//   backgroundColor: string | undefined,
//   color: string | undefined
// }


interface Props {
  productArray: Array<Product>,
};


  
function ProductGrid({ productArray }: Props) {
  const [deviceType, setDeviceType ] = useState<string>("desktop");
  const { favorites, isLoadingFavs } = UserFavs();
  const { reviews, isLoadingRevs } = UserReviews();
  console.log("🥰", favorites);
  
  useEffect(() => {
    const setDevice = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches;
      const isDesktop = window.matchMedia('(min-width: 992px)').matches;
  
      if (isMobile) {
        setDeviceType('mobile');
      } else if (isTablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
  
    setDevice();
    window.addEventListener('resize', setDevice);
  
    return () => {
      window.removeEventListener('resize', setDevice);
    };
  }, []);

  // const cssMakeStyles = makeStyles((theme: cssClass) => ({
  //   myClass: {
  //     height: theme.height,
  //     width: theme.width,
  //     padding: theme.padding,
  //     margin: theme.margin,
  //     backgroundColor: theme.backgroundColor,
  //     color: theme.color,
  //   },
  // }));

  

  return (
    <>
    <div>
    {deviceType === 'mobile' && (
      <p>This is the mobile view</p>
    )}
    {deviceType === 'tablet' && (
      <p>This is the tablet view</p>
    )}
    {deviceType === 'desktop' && (
      <p>This is the desktop view</p>
    )}
  </div>
    <div className="Grid">
      <Grid container style={{ margin: '-1px' }} spacing={0} columnGap={0}>
          {(!isLoadingFavs && !isLoadingRevs) && productArray.map((product) => (
              <Grid xs={12} style={{ padding: '1px',  marginBottom: 'auto' }} key={product.product_name}>
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