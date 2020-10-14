import React, { useState } from "react";
import "./App.css";
import "./main.scss";
import { AppBar, Tabs, Tab, ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./Components/Home";
import { Products, IProducts } from "./Components/Products";
import { Details } from "./Components/Details";
import { Cart } from "./Components/Cart";
import { Register } from "./Components/Order";
import { blue, green } from "@material-ui/core/colors";

function App() {
  const theme = createMuiTheme({
      palette: {
        primary: blue,
        secondary: green,
      },
  });
  theme.typography.h5 = {
    fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  }
  const defaultOrder: IProducts[] = [];
  const [order, setOrder] = useState(defaultOrder);
  const startUrl = window.location.pathname;
  const defaultSliderValue = ():number => {
    if(startUrl.startsWith('/details') || startUrl === '/products') return 1;
    else if(startUrl === '/cart' || startUrl === '/paycheck') return 2;
    else return 0;
  }
  const [siderValue, setSliderValue] = useState(defaultSliderValue);
  
  const handleClick = (productClicked: IProducts) => {
    console.log("You clicked in a product", productClicked);
    let array: IProducts[] = order;
    array.push(productClicked);
    setOrder(array);
    console.log("orders", order);
  };

  const removeHandler = (cartIndex: number) => {
    
    setOrder(prevState=>prevState.filter((item, index) => index !== cartIndex)
    )

  };
  const handleChange = (newValue: number) => {
    setSliderValue(newValue);
  };

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
        <AppBar title="My App" color="primary">
          <Tabs 
          value={siderValue}
          >
          <Tab 
              label="Home" 
              onClick={()=> handleChange(0)}
              component={Link}
              to="/"
              className="tab" 
              />
              <Tab 
              onClick={() => handleChange(1)}
              label="Products" 
              component={Link}
              to="/products"
              />
              <Tab 
              onClick={() => handleChange(2)}
              label="Cart" 
              component={Link}
              to="/cart"
              />
          </Tabs>
        </AppBar>
        <br />
        <br />
        <br />
        <Switch>
          <Route 
          path="/" 
          exact 
          component={Home}
          />
          <Route 
          path="/products" 
          exact
          render={() => <Products
            handleClick={handleClick}
            />}
            />
          <Route 
          path="/details/:id" 
          exact 
          component={Details}
          />
          <Route 
          path="/cart" 
          exact
          render={() => 
            <Cart 
            orders={order} 
            removeHandler={removeHandler}
            />}
            />
          <Route 
          path="/paycheck" 
          exact 
          render={() => 
            <Register
            orders={order}
            />
          }
          />
        </Switch>
          </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
