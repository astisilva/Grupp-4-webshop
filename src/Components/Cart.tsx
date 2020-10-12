import * as React from "react";
import { IProducts } from "./Products";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface ICartProps {
  orders: IProducts[];
  removeHandler(cartIndex: number): void;
}

export function Cart(props: ICartProps) {
  const defaultOrder = props.orders;
  const [product] = useState(defaultOrder);
  let sum: number = product.reduce((total, value) => total + value.price, 0);


  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
      <div className="container" style={{ padding: "25px" }}>
        {props.orders.map((item: IProducts, index) => {
          return (
            <React.Fragment key={index}>
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
                onClick={() => props.removeHandler(index)}
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
          <Button
          component={Link}
          to={{ pathname: "/paycheck", state: sum }}
            style={{
              border: "1px solid green",
              background: "lightgreen",
            }}
            disabled={ props.orders.length === 0 }
          >
            PURCHASE
          </Button>
      </div>
      <br />
    </div>
  );
}
