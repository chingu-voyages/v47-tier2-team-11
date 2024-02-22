import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import DeleteModal from "./deleteModal";

const Category = ({ data, handleSetData, datesAndDays }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleShowDeleteModal = (category) => {
    setSelectedCategory(category)
    setShowDeleteModal(!showDeleteModal)
  };
  

  const handleCategoryDelete = () => {
    // Filter out the selected category from the data
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id)
    localStorage.setItem("taskCraftData", JSON.stringify(updatedCategories));
    handleSetData(updatedCategories)
    setShowDeleteModal(false)
  }

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
                <i className="far fa-edit"></i>
              </button>
              <button
                className="delete-button"
                title="Delete Category"
                onClick={() => handleShowDeleteModal(category)}
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          {category.activityTypes.map((activity) => (
            <Activity
              key={activity.id}
              storedData={data}
              handleSetData={handleSetData}
              activityData={activity}
              categoryId={category.id}
              datesAndDays={datesAndDays}
              handleActivityDelete={handleActivityDelete}
              handleActivityEdit={handleActivityEdit}
            />
          ))}
          {showDeleteModal && 
            <DeleteModal 
              setShowDeleteModal={setShowDeleteModal}
              type="category"
              name={selectedCategory.categoryName}
              handleDelete = {handleCategoryDelete}/>
          }
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
