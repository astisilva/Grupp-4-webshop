import React, { useState } from "react";
import "./App.css";
import "./main.scss";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "./Components/Home";
import { Products, IProducts } from "./Components/Products";
import { Details } from "./Components/Details";
import { Cart } from "./Components/Cart";
import { Register } from "./Components/Order";

function App() {
  const defaultOrder: IProducts[] = [];
  const [order, setOrder] = useState(defaultOrder);
  const startUrl = window.location.pathname;
  const defaultSliderValue = ():number => {
    console.log(startUrl)
    if(startUrl.startsWith('/details')) return 1;
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

  return (
    <div className="App">
      <Router>
        <AppBar title="My App">
          <Tabs 
          value={siderValue}
          >
            <Link to="/">
              <Tab label="Home" className="tab" onChange={()=>setSliderValue(0)}/>
            </Link>

            <Link to="/products">
              <Tab label="Products" onChange={()=>setSliderValue(1)}/>
            </Link>

            <Link to="/cart">
              <Tab label="Cart" onChange={()=>setSliderValue(2)}/>
            </Link>
          </Tabs>
        </AppBar>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products" exact>
            <Products handleClick={handleClick} />
          </Route>
          <Route path="/details/:id" exact children={<Details />} />
          <Route path="/cart" exact>
            <Cart orders={order} removeHandler={removeHandler} />
          </Route>
          <Route path="/paycheck" exact>
            <Register orders={order} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
