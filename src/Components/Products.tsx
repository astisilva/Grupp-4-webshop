import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

export interface IProducts {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}
interface IOrderProps {
  handleClick(item: IProducts): void;
}

export function Products(props: IOrderProps) {
  const defaultOrder: IProducts[] = [];
  const [products, setProduct] = useState(defaultOrder);

  useEffect(() => {
    axios
      .get(`https://grupp-4-webshop.firebaseio.com/products.json`)
      .then((res) => {
        const products = res.data;
        setProduct(products);
        console.log("Mina produkter:", products);
      });
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <Grid 
      container
      spacing={2}
      justify="flex-start"
      alignItems="flex-start"
      >
      {products.map((product: IProducts, index:number) => {
        return (
          <Grid 
          item 
          key={index} 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3}>
          <Card>
            <CardActionArea
              component={Link}
              to={{
                pathname: `/details/${product.id}`,
                state: { product: product },
              }}
            >
                <CardMedia
                  image={product.imageUrl}
                  title={product.name}
                  style={{ height: "140px", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    noWrap={true}
                    color="secondary"
                  >
                    {product.name.substr(0, 18)}
                  </Typography>
                  <Typography
                    variant="body2"
                    noWrap={true}
                    color="primary"
                    component="p"
                    style={{ height: "50px" }}
                  >
                    {product.description.substr(0, 100)}
                  </Typography>
                </CardContent>
            <CardActions
            onClick={(e)=>{e.preventDefault()}}
            >
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => props.handleClick(product)}
              >
                Add to cart
              </Button>
            </CardActions>
            </CardActionArea>
          </Card>
          </Grid>
        );
      })}
      </Grid>
    </div>
  );
}
