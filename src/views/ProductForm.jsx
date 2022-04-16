import { useState } from "react";
import ProductService from "../services/product/productService";

const ProductForm = (props) => {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
  });

  const handleChange = (name) => (e) => {
    setFormState({
      ...formState,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await ProductService.addProduct(formState);

    props.callback();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange("name")} />
      <input type="text" onChange={handleChange("price")} />

      <button type="submit">Add</button>
    </form>
  );
};

export default ProductForm;
