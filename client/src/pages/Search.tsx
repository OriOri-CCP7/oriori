import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import Card from '../components/Card';
import DropdownMenu from '../components/DropdownMenu';

interface Props {};

export default function Search({}: Props) {
    const auth = UserAuth();
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = (prefId: string) => {
        axios.get(`/api/${prefId}/products/`, {
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
    };

    return (
        <div>
            <h1>
                Search
            </h1>
                <DropdownMenu labelName='Select a prefecture:' setPrefecture={getProducts}/>
            {
                products.map((product) => {
                    return <Card className='productCard' productName={product.product_name} img_url='' offerStart={product.start_date} offerEnd={product.end_date} favoriteNumber={0} onClick={function (event: React.MouseEvent<HTMLElement, MouseEvent>): void {
                        throw new Error('Function not implemented.');
                    } }/>;
                })
            }
        </div>
    );
};