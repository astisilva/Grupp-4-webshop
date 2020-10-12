/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { IProducts } from './Products';

interface IProduct {
    product: IProducts;
}

export function Details () {
    let {id}:{id:string} = useParams();
    let data = useLocation().state as IProduct;
    let product = data.product;
    console.log(data.product)

    return (
        <div style={{ textAlign: "center" }}>
        <br />
        <br />
        <br />
        <h3>Movie ID: {id}</h3>
        <div className="container" style={{display: 'flex'}}>
          <img
            src={product.imageUrl}
            style={{ width: "200px", height: "300px" }}
            />
            <h1>
              {product.name} -: {product.price},00 SEK st
            </h1>
        </div>
      </div>
    );
}
