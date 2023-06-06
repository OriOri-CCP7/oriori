import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card';

function GridComponent() {
    // const handleClick = (event: React.MouseEvent) => {
    //     console.log(event);
    //   };

    const testData = [
        {
          id: 1,
          name: "spring",
        },
        {
          id: 2,
          name: "summer",
        },
        {
          id: 3,
          name: "fall",
        },
        {
          id: 4,
          name: "winter",
        }
      ];

    return (
      <div className="Grid">
        <Grid container rowSpacing={1}>
            {testData.map((data) => (
                <Grid xs={6} key={data.id}>
                    <Card/>
                </Grid>
            ))}
        </Grid>
        
        
        
        
        
        
        {/* <Grid xs={6}>
        <Card className={undefined}
            productName={''}
            img_url={undefined}
            offerStart={''}
            offerEnd={''}
            favoriteNumber={0} 
            onClick={handleClick}/>
        </Grid>
        <Grid xs={6}>
        <Card className={undefined}
            productName={''}
            img_url={undefined}
            offerStart={''}
            offerEnd={''}
            favoriteNumber={0} 
            onClick={handleClick}/>
        </Grid>
        <Grid xs={6}>
        <Card className={undefined}
            productName={''}
            img_url={undefined}
            offerStart={''}
            offerEnd={''}
            favoriteNumber={0} 
            onClick={handleClick}/>
        </Grid>
        <Grid xs={6}>
        <Card className={undefined}
            productName={''}
            img_url={undefined}
            offerStart={''}
            offerEnd={''}
            favoriteNumber={0} 
            onClick={handleClick}/>
        </Grid> */}
      </div>
    );
  }
  
  export default GridComponent;
  