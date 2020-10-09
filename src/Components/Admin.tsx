import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { IOrder, IOrderRow } from "./Order";
import { Button } from "@material-ui/core";

interface IGetOrder {
    id: number
    companyId: number
    created: string
    createdBy: string
    paymentMethod: string
    totalPrice: number
    status: number
    orderRows: IOrderRow[]
}

export function Admin() {
    const defaultOrders: IGetOrder[] = [];
  const [admin, setAdminState] = useState(defaultOrders);
  const [toggle, setToggle] = useState(true)

  useEffect(() => { setToggle(false) }, [])

  useEffect(() => {
    axios
      .get(
        `http://medieinstitutet-wie-products.azurewebsites.net/api/orders?=8903`
      )
      .then((res) => {
        const products = res.data;
        setAdminState(products);
        console.log("Order completed:", products);
      });
  }, [toggle]);

  function deleteOrder(urlId: number) {
    axios
        .delete(`https://medieinstitutet-wie-products.azurewebsites.net/api/orders/${urlId}`)
        .then(r => {
            updateToggle(toggle);
        })
}
function updateToggle(toggle: boolean) {
    if (toggle) setToggle(false);
    else setToggle(true);
}
  return (
    <div className="container">
      <h1>Tack för att du handlar hos oss</h1>
      {admin.map((item, index) => {
        return (
          <div key={index}>
            <p>
              <b>Kund: </b> {item.createdBy}
              <span>
                <b> TOTAL: </b> SEK {item.totalPrice},00{" "}
              </span>
              <Button
               size="small"
               style={{
                 border: "1px solid red",
                 background: "lightcoral",
                 float: "right",
               }}
                onClick={() => {
                  deleteOrder(item.id);
                }}
              >
                X
              </Button>
            </p>
              <br />
          </div>
        );
      })}
    </div>
  );
}
