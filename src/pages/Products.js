import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;