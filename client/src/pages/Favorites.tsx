import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import GridComponent from '../components/Grid';

interface Props {};

function Favorites({}: Props) {
    const auth = UserAuth();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get(`/api/products/${auth?.user.uuid}/favorites/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': auth?.csrftoken ?? ""
            }
        })
        .then((response) => {
            console.log(response);
            setProducts(response.data);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>
                Favorites
            </h1>
            {
                products.length > 0
                ? <GridComponent productArray={products} setProductArray={null}/>
                : <>
                    <p>
                        Add to your favorites by tapping the heart icon on any product!
                    </p>
                </>
            }
        </div>
    );
};

export default Favorites;