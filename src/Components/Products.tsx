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

  /* const searchHandler = (data: IProducts[]) => {
    setProduct(data);
    console.log("data", data);
  }; */
  return (
    <div className="productContainer">
      <br />
      <br />
      <br />
      {products.map((product: IProducts) => {
        return (
          <Card className="root" style={{ maxWidth: "250px" }} key={product.id}>
            <CardActionArea>
              <Link
                className="btnCard"
                to={{
                  pathname: `/details/${product.id}`,
                  state: { product: product },
                }}
              >
                <CardMedia
                  className="media"
                  image={product.imageUrl}
                  title={product.name}
                  style={{ height: "140px", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name.substr(0, 18)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ height: "50px" }}
                  >
                    {product.description.substr(0, 100)}
                    {/* {product.description} */}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                style={{ border: "1px solid green", background: "lightgreen" }}
                onClick={() => props.handleClick(product)}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
