import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { IProducts } from "./Products";

interface ISearchProps {
  searchHandler(data: IProducts[]): void;
}

export function Search(props: ISearchProps) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
      if(searchValue.length > 1 && !searchValue.startsWith(" ")){
          axios
            .get(
              `https://medieinstitutet-wie-products.azurewebsites.net/api/search?=${searchValue}`
            )
            .then((res) => {
              // const products = res.data;
              // setSearchValue(products);
              // console.log("Mina search:", products);
              props.searchHandler(res.data);
            })
        }
        }, [searchValue])
      

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log("e value", e.target.value);
  };

  return (
    <TextField
      value={searchValue}
      onChange={searchHandler}
      id="filled-basic"
      label="Search movie"
      variant="filled"
      style={{ width: "90%", fontWeight: "bold", margin: " 5px" }}
    />
  );
}
