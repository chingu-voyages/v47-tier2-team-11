import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import DeleteModal from "./deleteModal";
import { saveToLocalStorage } from "./TaskHandler";

const Category = ({ data, handleSetData, datesAndDays }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false)
  const [showActivityDeleteModal, setShowActivityDeleteModal] = useState(false)

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleShowDeleteModal = (category) => {
    setSelectedCategory(category)
    setShowCategoryDeleteModal(!showCategoryDeleteModal)
  };

  const handleShowActivityDeleteModal = (category, activity) => {
    setSelectedCategory(category)
    setSelectedActivity(activity)
    setShowActivityDeleteModal(!showActivityDeleteModal)
  };
  

  const handleCategoryDelete = () => {
    // Filter out the selected category from the data
    const updatedCategories = categories.filter(category => category.id !== selectedCategory.id)
    setCategories(updatedCategories)
    localStorage.setItem("taskCraftData", JSON.stringify(updatedCategories));
    handleSetData(updatedCategories)
    setShowCategoryDeleteModal(false)
  }

  const handleActivityDelete = () => {
    // Filter out the selected activity from the categories
    const updatedActivities = selectedCategory.activityTypes.filter(storedActivity => storedActivity.id !== selectedActivity.id)
    saveToLocalStorage({type: "category", categoryId: selectedCategory.id, activityId: selectedActivity.id, updatedData: updatedActivities, storedData: data, handleSetData})
    setShowActivityDeleteModal(false)
  }

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
              category={category}
              datesAndDays={datesAndDays}
              handleShowActivityDeleteModal={handleShowActivityDeleteModal}
              handleActivityEdit={handleActivityEdit}
            />
          ))}
          {showCategoryDeleteModal && 
            <DeleteModal 
              setShowDeleteModal={setShowCategoryDeleteModal}
              type="category"
              name={selectedCategory.categoryName}
              handleDelete = {handleCategoryDelete}/>
          }
           {showActivityDeleteModal && 
            <DeleteModal 
              setShowDeleteModal={setShowActivityDeleteModal}
              type="activity"
              name={selectedActivity.activityName}
              handleDelete = {handleActivityDelete}/>
          }
        </React.Fragment>
      ))}
    </>
  );
};

export default Category;
