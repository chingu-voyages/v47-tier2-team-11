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

  const handleCategoryEdit = (category) => {
    const newName = window.prompt(
      `Edit category name for "${category.categoryName}":`,
      category.categoryName
    );

    if (newName !== "") {
      const updatedCategories = categories.map((storedCategory) =>
        storedCategory.id === category.id
          ? { ...storedCategory, categoryName: newName }
          : storedCategory
      );

      setCategories(updatedCategories);
    }
  };

  const handleActivityEdit = (activity) => {
    const newName = window.prompt(
      `Edit activity name for "${activity.activityName}":`,
      activity.activityName
    );

    if (newName !== "") {
      const updatedCategories = categories.map((storedCategory) => {
        const updatedActivities = storedCategory.activityTypes.map(
          (storedActivity) =>
            storedActivity.id === activity.id
              ? { ...storedActivity, activityName: newName }
              : storedActivity
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
                className="edit-button"
                title="Edit Category"
                onClick={() => handleCategoryEdit(category)}
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                className="delete-button"
                title="Delete Category"
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
              handleActivityEdit={handleActivityEdit}
            />
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
