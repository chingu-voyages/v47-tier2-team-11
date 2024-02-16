import React, { useEffect, useState } from "react";
import Activity from "./Activity";

const Category = ({ data, datesAndDays }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleCategoryDelete = (category) => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete the category "${category.categoryName}"?`
    );
    if (shouldDelete) {
      const updatedCategories = categories.filter(
        (storedCategory) => storedCategory.id !== category.id
      );
      setCategories(updatedCategories);
    }
  };

  const handleActivityDelete = (activity) => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete the activity "${activity.activityName}"?`
    );
    if (shouldDelete) {
      const updatedCategories = categories.map((storedCategory) => {
        const updatedActivities = storedCategory.activityTypes.filter(
          (storedActivity) => storedActivity.id !== activity.id
        );

        return {
          ...storedCategory,
          activityTypes: updatedActivities,
        };
      });

      setCategories(updatedCategories);
    }
  };

  return (
    <>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <tr>
            <td
              colSpan="31"
              style={{
                backgroundColor: "#00473e",
                border: "1px solid #ffffff",
                color: "#ffffff",
                fontWeight: "bold",
                padding: "5px",
              }}
            >
              {category.categoryName}
              <button
                className="delete-button"
                onClick={() => handleCategoryDelete(category)}
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          {category.activityTypes.map((activity) => (
            <Activity
              key={activity.id}
              storedData={data}
              activityData={activity}
              datesAndDays={datesAndDays}
              handleActivityDelete={handleActivityDelete}
            />
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
