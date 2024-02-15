import React, { useEffect, useState } from "react";
import Activity from "./Activity";

const Category = ({ data, datesAndDays }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {    
    if (data) {
      setCategories(data);
    }
  }, [data]);

  return (
    <>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <tr>
            <td colSpan="31" style={{ backgroundColor: "#00473e", border: "1px solid #ffffff", color: "#ffffff", fontWeight: "bold", padding: "5px" }}>
              {category.categoryName}
            </td>
          </tr>
          {category.activityTypes.map((activity) => (
            <Activity
              key={activity.id}
              storedData={data}
              activityData={activity}
              datesAndDays={datesAndDays}
          />     
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
