import axios from "axios";
import { API_KEY } from "./apikey.js";

const instance = axios.create({
  baseURL: "https://upayments-studycase-api.herokuapp.com/api",
  timeout: 5000,
  headers: { Authorization: "Bearer " + API_KEY },
});

export const fetchAllProducts = async () => {
  const response = await instance.get("products");
  console.log('fetchAllProducts response', response);
  const { status, data = {}, error } = response;
  if (error) alert(error);
  else if (status !== 200) alert("Error occured while fetching product list");

  return data?.products || [];
};

export const fetchAProduct = async (id) => {
  const response = await instance.get("products/" + id);
  // console.log("prouduct", response);
  const { status, data, error } = response;
  if (error) alert(error);
  else if (status !== 200)
    alert("Error occured while fetching the product: " + id);

  return data?.product;
};

export const fetchAllCategories = async () => {
  const response = await instance.get("categories");
  console.log("response of categories", response);
  const { status, data = {}, error } = response;
  if (error) alert(error);
  else if (status !== 200) alert("Error occured while fetching category list");

  return data?.categories || [];
};

export const fetchACategory = async (id) => {
  const response = await instance.get("categories/" + id);
  // console.log("category response: ", response);
  const { status, data, error } = response;
  if (error) alert(error);
  else if (status !== 200)
    alert("Error occured while fetching the product: " + id);

  return data?.category;
};

export const insertProduct= async (product)=>{
  const response= await instance.post("products",{
    ...product,
    developerEmail: "y.selimdogan@gmail.com"
  });

  return response;
}

/*
1. Products

GET: https://upayments-studycase-api.herokuapp.com/api/products

GET: https://upayments-studycase-api.herokuapp.com/api/products/{id}

POST: https://upayments-studycase-api.herokuapp.com/api/products

2. Categories

GET: https://upayments-studycase-api.herokuapp.com/api/categories/

GET: https://upayments-studycase-api.herokuapp.com/api/categories/{id} 
*/
