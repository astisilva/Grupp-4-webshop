import * as React from "react";
import { IProducts } from "./Products";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface ICartProps {
  orders: IProducts[];
  removeHandler(item: IProducts): void;
}

export function Cart(props: ICartProps) {
  const defaultOrder = props.orders;
  const [product, setProduct] = useState(defaultOrder);
  let sum: number = product.reduce((total, value) => total + value.price, 0);

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("clicked");
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
      <div className="container" style={{ padding: "25px" }}>
        {props.orders.map((item: IProducts) => {
          return (
            <React.Fragment key={item.id}>
              <div>
                <span>
                  <b>Item: </b> {item.name}
                </span>
                <span>
                  <b>Price: </b> {item.price} -:
                </span>
              <Button
                size="small"
                style={{
                  border: "1px solid red",
                  background: "lightcoral",
                  float: "right",
                }}
                onClick={() => props.removeHandler(item)}
                >
                REMOVE
              </Button>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
                <p style={{float: 'left'}}>
                  <b>TOTAL: </b> {sum}, 00{" "}
                </p>
        <Link to={{ pathname: "/paycheck", state: sum }}>
          <Button
            style={{
              border: "1px solid green",
              background: "lightgreen",
              // float: "right",
            }}
            onClick={() => console.log("OK")}
          >
            PURCHASE
          </Button>
        </Link>
      </div>
      <br />
    </div>
  );
}
