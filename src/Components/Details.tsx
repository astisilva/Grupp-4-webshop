/* eslint-disable jsx-a11y/alt-text */
import { Box, CardMedia, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { IProducts } from './Products';


interface IProduct {
    product: IProducts;
}

export function Details () {
    let data = useLocation().state as IProduct;
    let product = data.product;

    return (

      <Grid
        container
      >
        <Grid
          item
          xs={12}
        >
          <Grid
          container
          direction='column'
          >
            <Grid
            item
            >
              <CardMedia
                className="media"
                image={product.imageUrl}
                title={product.name}
                style={{width: "100%", height: "20em"}}
                />

            </Grid>
            <Grid
            item
            >
              <Box
              bgcolor='warning.main'
              pt={5}
              pb={5}
              color="#FFF"
              >
                <Typography
                  variant='h5'
                  align='center'
                  >
                  {product.name}
                </Typography>
                <Typography
                  variant='body1'
                  align='center'
                  gutterBottom
                  >
                  {product.description}
                </Typography>
                <Typography
                  variant='h5'
                  align='center'
                  gutterBottom
                  >
                  {product.price} kr
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    );
}
