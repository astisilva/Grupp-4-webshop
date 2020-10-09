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
import { Search } from "./SearchComponent";
import { Category } from "./Category";

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
  const [movies, setMovie] = useState(defaultOrder);

  useEffect(() => {
    axios
      .get(`http://medieinstitutet-wie-products.azurewebsites.net/api/products`)
      .then((res) => {
        const products = res.data;
        setMovie(products);
        console.log("Mina produkter:", products);
      });
  }, []);

  const searchHandler = (data: IProducts[]) => {
    setMovie(data);
    console.log("data", data);
  };
  return (
    <div className="productContainer">
      <br />
      <br />
      <br />
      <div className="containerSearch">
        <Search searchHandler={searchHandler} />
      </div>
        <Category />
      {movies.map((movie: IProducts) => {
        return (
          <Card className="root" style={{ maxWidth: "250px" }} key={movie.id}>
            <CardActionArea>
              <Link
                className="btnCard"
                to={{
                  pathname: `/details/${movie.id}`,
                  state: { product: movie },
                }}
              >
                <CardMedia
                  className="media"
                  image={movie.imageUrl}
                  title={movie.name}
                  style={{ height: "140px", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.name.substr(0, 18)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ height: "50px" }}
                  >
                    {movie.description.substr(0, 100)}
                    {/* {movie.description} */}
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                style={{ border: "1px solid green", background: "lightgreen" }}
                onClick={() => props.handleClick(movie)}
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
