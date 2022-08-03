import React, { useEffect, useState , useContext} from "react";
// import {
//   fetchACategory,
// } from "../../api/api";
import MainTemplate from "../../components/templates/mainTemplate/mainTemplate";
import "./homePage.css";
import { useNavigate, Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppContext from "../../AppContext";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchACategory(selectedCategory);
  // }, [selectedCategory]);

  const { products, categories } = useContext(AppContext);
  
  const createProductButton = (
    <Fab
      color="primary"
      aria-label="add"
      size="large"
      style={{ position: "fixed", zIndex: 99, bottom: 25, right: "7%" }}
      onClick={() => {
        navigate("/productCreate");
      }}
    >
      <AddIcon />
    </Fab>
  );

  const productFilterBar = (
    <div className="productFilterBar">
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>

        <OutlinedInput
          label="Search"
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl style={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          value={selectedCategory}
          label="Categories"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem key={"all_categories_0"} value={"All Categories"}>
            {"All Categories"}
          </MenuItem>
          {categories.map((c) => {
            return (
              <MenuItem key={c._id} value={c.name}>
                {c.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );

  const productListBox = (
    <div className="productListBox">
      {products &&
        products
          .filter((p) => {
            if (
              selectedCategory !== "All Categories" &&
              selectedCategory !== p.category
            )
              return false;
            else return true;
          })
          .map((p) => {
            let pName = p.name ?? "";
            if (pName.length > 35) pName = p.name.substring(0, 35) + "...";
            return (
              <Link
                key={p._id}
                to={"/productDetail/" + p._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="productBox">
                  <div className="avatarBox">
                    <img className="avatar" src={p.avatar} />
                  </div>

                  <span> {pName}</span>
                  <span> {"$ " + p.price}</span>
                </div>
              </Link>
            );
          })}
    </div>
  );

  return (
    <MainTemplate
      content={
        <>
          {productFilterBar}
          {productListBox}
          {createProductButton}
        </>
      }
    />
  );
}
