import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import "./Category.css";
const Category = ({ data }) => {
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    if (data) {
      const names = data.map((item) => item.categoryName);
      setCategoryNames(names);
    }
  }, [data]);

  if (!data) {
    return <p>Please wait</p>;
  }

  return (
    <>
      <ul className="noBullets">
        {categoryNames.map((name, index) => (
          <li key={index}>
            {name}
            <Activity categoryData={data[index]} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Category;
