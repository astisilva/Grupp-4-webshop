import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useLocation, Link } from "react-router-dom";
import { IProducts } from "./Products";

interface IRegisterProps {
  orders: IProducts[];
}

export interface IOrderRow {
  ProductId: number;
  OrderId: number;
  Amount: number;
}

export interface IOrder {
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: IOrderRow[];
}

export function Register(props: IRegisterProps) {
  let sum: number = useLocation().state as number;
    const [value, setValue] = React.useState('female');

  const defaultValue: IOrder = {
    companyId: 8903,
    created: "0001-01-01T00:00:00",
    createdBy: "",
    paymentMethod: "",
    totalPrice: sum,
    status: 2,
    orderRows: [],
  };
  const [registerState, setRegisterState] = useState(defaultValue);

  useEffect(() => {
    let orderArray: IOrderRow[] = props.orders.map((item) => {
      return {
        ProductId: item.id,
        OrderId: item.id,
        Amount: sum,
      };
    });
    setRegisterState({
      ...registerState,
      orderRows: orderArray,
    });
  }, [props]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("POST - state:", registerState);
    axios
      .post(
        `https://medieinstitutet-wie-products.azurewebsites.net/api/orders`,
        JSON.stringify(registerState),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        setRegisterState(result.data);
        console.log("Mina ordrar", result.data);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetName = event.target.name;

    setRegisterState({
      ...registerState,
      [targetName]: event.target.value,
    });
  };

  return (
    <div>
      <div className="container">
        <Link to="/admin">
          <div className="adminAvatar">
            <div id="avatar"></div>
            <b>ADMIN</b>
          </div>
        </Link>

        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>Register your order:</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <label>Email:</label>
          <TextField
            id="standard-basic"
            type="email"
            value={registerState.createdBy}
            name="createdBy"
            onChange={handleChange}
          />
          <label>Card:</label>
          {/* <TextField
            id="standard-basic"
            type="text"
            value={registerState.paymentMethod}
            name="paymentMethod"
            onChange={handleChange}
          /> */}
          <div>
          <input type="checkbox" name="paymentMethod" value="visa" onChange={handleChange}/>
          <img src="https://img.favpng.com/4/20/5/credit-card-visa-electron-mastercard-png-favpng-aDKdw0ntnaPfLAeZf8aLWKQab.jpg" style={{width: '50px'}} />
          <input type="checkbox" name="paymentMethod" value="mastercard" onChange={handleChange}/>
          <img src="https://p1.hiclipart.com/preview/191/339/693/visa-mastercard-logo-credit-card-yellow-text-line-area-circle-png-clipart.jpg" style={{width: '50px'}} />
          <input type="checkbox" name="paymentMethod" value="maestro" onChange={handleChange}/>
          <img src="https://i7.pngguru.com/preview/397/232/908/maestro-mastercard-credit-card-debit-card-payment-mastercard.jpg" style={{width: '50px'}} />

          </div>
          <label>Amount:</label>
          <TextField
            id="standard-basic"
            type="tel"
            value={"SEK " + sum + ",00"}
            name="totalPrice"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            className="form-btn"
            style={{
              border: "1px solid green",
              background: "lightgreen"
            }}
          >
            READY TO PAY
          </Button>
        </form>
      </div>
    </div>
  );
}
