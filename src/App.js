import "./App.css";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";

import HomePage from "./pages/homePage/homePage";
import ProductDetailPage from "./pages/productDetailPage/productDetailPage";
import ProductCreatePage from "./pages/productCreatePage/productCreatePage";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/productDetail/:id"
            element={<ProductDetailPage />}
          />
          <Route exact path="/productCreate" element={<ProductCreatePage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
