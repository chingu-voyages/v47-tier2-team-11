import React, { useEffect, useState } from "react";
import "./Category.css";
const Category = ({ data }) => {
  const [categoryNames, setCategoryNames] = useState([]);
  useEffect(() => {
    if (data) {
      const names = data.map((item) => item.categoryName);
      setCategoryNames(names);
    }
  }, [data]);



  return (
    <>
      <ul className="noBullets">
        {categoryNames.map((name, index) => (
          <li key={index}>
            {name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
