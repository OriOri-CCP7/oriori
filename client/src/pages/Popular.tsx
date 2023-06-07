import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Card from '../components/Card';

interface Props {};

function Popular({}: Props) {
  const auth = UserAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('api/products/popular/?format=json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': auth?.csrftoken ?? ""
      }
    })
    .then((response) => {
      setProducts(response.data);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>
        Popular
      </h1>
      {
        products.map((product) => {
          return <Card className='productCard' productName={product.product_name} img_url='' offerStart={product.start_date} offerEnd={product.end_date} favoriteNumber={0} onClick={function (event: React.MouseEvent<HTMLElement, MouseEvent>): void {
            throw new Error('Function not implemented.');
          } }></Card>;
        })
      }
    </div>
  );
}

export default Popular;