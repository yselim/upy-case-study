import { TextField, Button, Container } from "@mui/material";
import React, { useContext, useState } from "react";
import MainTemplate from "../../components/templates/mainTemplate/mainTemplate";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./productCreatePage.css";
import {  insertProduct } from "../../api/api";
import { useNavigate} from "react-router-dom";
import AppContext from "../../AppContext";

const textInputs = [
  //key, name, multiline
  ["name", "Product Name"],
  ["description", "Description", "multiline"],
  ["avatar", "Image URL"],
  ["price", "Price"],
];

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { categories, getAllProducts } = useContext(AppContext);

  const onSubmit = async () => {
    let inputsAreValid = true;

    for (const row of textInputs) {
      const key = row[0];
      const val = inputValues[key];
      if (!val || val.length === 0) inputsAreValid = false;
    }

    if (!inputsAreValid) {
      alert("Please fill all the fields");
      return;
    }

    const result = await insertProduct({
      ...inputValues,
      category: selectedCategory,
    });

    if (result?.status === 201) {
      getAllProducts();
      navigate("/");
    } else {
      alert("Ops. Something went wrong!");
    }
    console.log("result of insertion: ", result);
  };

  const categoryChooser = (
    <FormControl className="inputsOfProductCreate">
      <InputLabel id="demo-simple-select-label">Categories</InputLabel>
      <Select
        value={selectedCategory}
        label="Categories"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((c) => {
          return (
            <MenuItem key={c._id} value={c.name}>
              {c.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );

  return (
    <MainTemplate
      content={
        <Container maxWidth="sm">
          <div className="productCreatePage">
            <h2>Create Product</h2>
            {categoryChooser}

            {textInputs.map((inputRow) => {
              const [key, name, multiline] = inputRow;
              return (
                <TextField
                  key={key}
                  value={inputValues[key]}
                  placeholder={name}
                  multiline={multiline}
                  type={key === "price" ? "number" : ""}
                  onChange={(e) => {
                    setInputValues({ ...inputValues, [key]: e.target.value });
                  }}
                  style={{ marginTop: 12 }}
                />
              );
            })}

            <Button
              variant="outlined"
              style={{ marginTop: 30 }}
              onClick={onSubmit}
            >
              SUBMIT
            </Button>
          </div>
        </Container>
      }
    />
  );
}
