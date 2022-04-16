import { useEffect, useState } from "react";
import ProductService from "../services/product/productService";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getLists = async () => {
    const res = await ProductService.getProducts();

    setProducts(res.data.data);
  };

  useEffect(() => {
    getLists();
  }, []);

  const handleDelele = async (id) => {
    await ProductService.deleteProduct(id);
    
    getLists();
  };

  return (
    <div>
      <p>Product List</p>

      <ul>
        {products.map((product) => {
          return (
            <li>
              Name: {product.name} - Price: {product.price} -{" "}
              <button onClick={() => handleDelele(product.id)}>Delete</button>
            </li>
          );
        })}
      </ul>

      <p>Add Product</p>

      <ProductForm callback={getLists} />
    </div>
  );
};

export default ProductList;
