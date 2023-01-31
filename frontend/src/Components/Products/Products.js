import { useState, useEffect } from "react";

import AddNewProduct from "../AddNewProuct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";

function Prosucts() {
  const [AllProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((products) => setAllProducts(products));
  };
  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable
        AllProducts={AllProducts}
        getAllProducts={getAllProducts}
      />
    </>
  );
}

export default Prosucts;
