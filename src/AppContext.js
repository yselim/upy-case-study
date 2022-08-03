import React, { Component } from "react";
import { fetchAllCategories, fetchAllProducts } from "./api/api";

const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts = async () => {
    const data = await fetchAllProducts();
    this.setState({ products: data });
  };

  getAllCategories = async () => {
    const data = await fetchAllCategories();
    this.setState({ categories: data });
  };

  render() {
    const { getAllProducts } = this;

    return (
      <AppContext.Provider
        value={{
          ...this.state,
          getAllProducts,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;

export { AppProvider };
