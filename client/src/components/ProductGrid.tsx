import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { UserBkmarks } from '../context/BkmarkContext';
import { UserReviews } from '../context/ReviewContext';
import ProductCard from './ProductCard';
// import { makeStyles } from '@mui/material/styles';
// import { styled, makeStyles } from '@mui/material/styles';

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
  // const [deviceType, setDeviceType ] = useState<string>("desktop");
  const { bookmarks, isLoadingBkmarks } = UserBkmarks();
  const { reviews, isLoadingRevs } = UserReviews();
  console.log("🥰", bookmarks);
  
  // useEffect(() => {
  //   const setDevice = () => {
  //     const isMobile = window.matchMedia('(max-width: 767px)').matches;
  //     const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches;
  //     // const isDesktop = window.matchMedia('(min-width: 992px)').matches;
  
  //     if (isMobile) {
  //       setDeviceType('mobile');
  //     } else if (isTablet) {
  //       setDeviceType('tablet');
  //     } else {
  //       setDeviceType('desktop');
  //     }
  //   };
  
  //   setDevice();
  //   window.addEventListener('resize', setDevice);
  
  //   return () => {
  //     window.removeEventListener('resize', setDevice);
  //   };
  // }, []);

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
    <div className="Grid">
      <Grid container style={{ margin: '-1px' }} spacing={0} columnGap={0}>
          {(!isLoadingBkmarks && !isLoadingRevs) && productArray.map((product) => (
              <Grid xs={12} style={{ padding: '1px',  marginBottom: 'auto' }} key={product.product_name}>
                  <ProductCard 
                    product={product}
                    bookmark={bookmarks[product.id.toString()]}
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