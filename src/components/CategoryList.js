import React, { useState, useEffect } from 'react';
import { getCategories } from '../api';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data.data);
  };

  return (
    <div>
      <h2>Categories</h2>
      {categories.map(category => (
        <button key={category.id} onClick={() => onSelectCategory(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;