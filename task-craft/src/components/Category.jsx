import React, { useEffect, useState } from "react";
import Activity from "./Activity";
const Category = ({ data, datesAndDays }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (data) {
      const names = data.map((item) => item);
      setCategory(names);
    }
  }, [data]);

  return (
    <>
      {category.map((item, index) => (
        <React.Fragment key={`category-fragment-${index}`}>
          <tr>
            <td
              key={`category-${index}`}
              style={{ fontWeight: "bold", color: "#3559E0" }}
            >
              {item.categoryName}
            </td>
          </tr>
          <Activity categoryData={item} datesAndDays={datesAndDays} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
