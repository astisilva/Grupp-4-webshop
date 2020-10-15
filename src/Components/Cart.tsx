/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { IProducts } from "./Products";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

interface ICartProps {
  orders: IProducts[];
  removeHandler(cartIndex: number): void;
}

export function Cart(props: ICartProps) {  
  let sum: number = props.orders.reduce((total, value) => total + value.price, 0);
  


  return (
    <Grid
    container
    direction="column"
    alignItems="center"
    >
      <Grid item>
        <Box
        color="primary.light"
        pt={2}
        pb={2}
        >
        <Typography variant="h4" >Cart</Typography>
        </Box>
      </Grid>
      <Grid item>     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box
                  width={{xs: 100, sm: 250 }}
                  >
                   <Typography> Product</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box
                  width={{xs: 100, sm: 125, }}
                  > 
                  <Typography>

                  Price
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.orders.map((product, index) => {
              return (
              <TableRow key={index}>
                <TableCell 
                component="th" 
                scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">
                  <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  >
                  <span>
                  {product.price} kr
                  </span>
                  <Box
                  pl={1}
                  >
                  <Button
                size="small"
                
                onClick={() => props.removeHandler(index)}
                >
                <DeleteIcon fontSize="small"/>
              </Button>
                </Box>
                </Box>
                </TableCell>
                
              </TableRow>
              )})}
              <TableRow>
                <TableCell>
                  <Typography>
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>
                   {sum} kr
                  </Typography>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid
      item
      >
      <Box
      pt={5}
      >
      <Button
          component={Link}
          to={{ pathname: "/paycheck", state: sum }}
          variant="contained"
          color="primary"
          disabled={ props.orders.length === 0 }
          >
            PURCHASE
          </Button>
          </Box>
          </Grid>
    </Grid>
  );
}
