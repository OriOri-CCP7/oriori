import { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Card from './Card';

type productData = typeof Card;

function GridComponent() {
    const [productData, setProductData] = useState<productData[]>([]);

    //getProductDataByPrefecture
    //path('<str:prefecture>/products/', views.getProductDataByPrefecture),
    //if the currentview is Home, it displays all products by user's prefecrure
    //if the currentview is Favorite, it shows favorite products

    async function getAllProducts() {
        const fetchedData = await axios.get(`http://localhost:8080/api/Hokkaido/products/`);
        setProductData(fetchedData.data)
        console.log("😂", fetchedData.data)
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    const ProductData = [
        {
          productName: "Setouchi Lemon Cake Frappuccino",
          img_url: "https://www.starbucks.co.jp/cafe/lemon-cake/images/kv/kv_item_on.png",
          offerStart: "2023-05-30",
          offerEnd: "2023-06-07",
          className: "",
          onClick: () => {},
          favoriteNumber: 0,
        },
        {
            productName: "Springfield Bart Simpson Spring Edition",
            img_url: "https://www.starbucks.co.jp/cafe/lemon-cake/images/kv/kv_item_on.png",
            offerStart: "2023-06-10",
            offerEnd: "2023-07-31",
            className: "",
            onClick: () => {},
            favoriteNumber: 0,
          },
          {
            productName: "Hell With It Special Hot & spciy Chicken Summer Special",
            img_url: "https://www.starbucks.co.jp/cafe/lemon-cake/images/kv/kv_item_on.png",
            offerStart: "2023-06-30",
            offerEnd: "2023-07-31",
            className: "",
            onClick: () => {},
            favoriteNumber: 0,
          },
          {
            productName: "SnowBall Winter Special with Extra sakura",
            img_url: "https://www.starbucks.co.jp/cafe/lemon-cake/images/kv/kv_item_on.png",
            offerStart: "2023-06-30",
            offerEnd: "2023-07-31",
            className: "",
            onClick: () => {},
            favoriteNumber: 0,
          },
          {
            productName: "SnowBall Spring Special with Extra sakura",
            img_url: "https://www.starbucks.co.jp/cafe/lemon-cake/images/kv/kv_item_on.png",
            offerStart: "2023-06-30",
            offerEnd: "2023-07-31",
            className: "",
            onClick: () => {},
            favoriteNumber: 0,
          },
          {
            productName: "SnowBall Fall Special with Extra sakura",
            img_url: "https://www.starbucks.co.jp/cafe/lemon-cake/images/kv/kv_item_on.png",
            offerStart: "2023-06-30",
            offerEnd: "2023-07-31",
            className: "",
            onClick: () => {},
            favoriteNumber: 0,
          },
      ];

    return (
      <div className="Grid">
        <Grid container rowSpacing={1}>
            {ProductData.map((data) => (
                <Grid xs={6} key={data.productName}>
                    <Card 
                    className={data.productName}
                    productName={data.productName}
                    img_url={data.img_url}
                    offerStart={data.offerStart}
                    offerEnd={data.offerEnd}
                    favoriteNumber={data.favoriteNumber} 
                    onClick={data.onClick}/>
                </Grid>
            ))}
        </Grid>
      </div>
    );
  }
  
  export default GridComponent;
  