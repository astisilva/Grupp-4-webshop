/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { IProducts } from "./Products";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, Box, Paper } from "@material-ui/core";

interface IRegisterProps {
  orders: IProducts[];
  removeHandler(cartIndex: number):void;
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
  const defaultValue: IOrder = {
    companyId: 8903,
    created: "0001-01-01T00:00:00",
    createdBy: "",
    paymentMethod: "visa",
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
        `https://grupp-4-webshop.firebaseio.com/orders.json`,
        JSON.stringify(registerState),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log("Mina ordrar", result.data);
      });
    props.orders.forEach((item, index)=>props.removeHandler(index))
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetName = event.target.name

    setRegisterState({
      ...registerState,
      [targetName]: event.target.value,
    });
  };
  if(props.orders.length !== 0) {
    return (
      <Grid
      container
      direction="column"
      alignContent="center"
      >
        <Grid
        item
        >
          <Box
          mt={5}
          p={5}
          bgcolor="primary.light"
          color="#FFF"
          component={Paper}
          >
            <form noValidate onSubmit={handleSubmit} autoComplete="off">
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment</FormLabel>
                <Box
                mt={2}
                >
                  <TextField
                      required
                      helperText="Enter email here"
                      type="email"
                      value={registerState.createdBy}
                      name="createdBy"
                      label="Email"
                      onChange={handleChange}
                      />
                </Box>
                <Box
                mt={2}
                >                
                  <RadioGroup aria-label="paymentMethod" name="paymentMethod" value={registerState.paymentMethod}>
                    <FormControlLabel value="visa" control={<Radio onChange={handleChange}/>} label="VISA" />
                    <FormControlLabel value="mastercard" control={<Radio onChange={handleChange}/>} label="Mastercard" />
                    <FormControlLabel value="maestro" control={<Radio onChange={handleChange}/>} label="Maestro" />
                  </RadioGroup>
                </Box> 
                <Box
                mt={5}
                >
                  <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        >
                        READY TO PAY
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Box>
        </Grid>
     </Grid>
    );
}
    else {
      window.location.href = "/";
      return (<h2>Rerouting to starting page</h2>)
    }
}
