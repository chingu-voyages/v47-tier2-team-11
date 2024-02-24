import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import DeleteModal from "./DeleteModal";
import { saveToLocalStorage } from "./TaskHandler";
import "./EditName.css";

const Category = ({ data, handleSetData, datesAndDays }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);
  const [showActivityDeleteModal, setShowActivityDeleteModal] = useState(false);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleShowDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowCategoryDeleteModal(!showCategoryDeleteModal);
  };

  const handleShowActivityDeleteModal = (category, activity) => {
    setSelectedCategory(category);
    setSelectedActivity(activity);
    setShowActivityDeleteModal(!showActivityDeleteModal);
  };

  const handleCategoryDelete = () => {
    const updatedCategories = categories.filter(
      (category) => category.id !== selectedCategory.id
    );
    setCategories(updatedCategories);
    localStorage.setItem("taskCraftData", JSON.stringify(updatedCategories));
    handleSetData(updatedCategories);
    setShowCategoryDeleteModal(false);
  };

  const handleActivityDelete = () => {
    const updatedActivities = selectedCategory.activityTypes.filter(
      (storedActivity) => storedActivity.id !== selectedActivity.id
    );
    saveToLocalStorage({
      type: "category",
      categoryId: selectedCategory.id,
      activityId: selectedActivity.id,
      updatedData: updatedActivities,
      storedData: data,
      handleSetData,
    });
    setShowActivityDeleteModal(false);
  };

  const handleActivityEdit = (category, activity, newName) => {
    if (newName.trim() === "") return;
    const words = newName.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const newActivityName = capitalizedWords.join(" ");

    const updatedActivityTypes = category.activityTypes.map(
      (storedActivity) => {
        if (storedActivity.id !== activity.id) return storedActivity;
        return { ...storedActivity, activityName: newActivityName };
      }
    );
    saveToLocalStorage({
      type: "category",
      categoryId: category.id,
      updatedData: updatedActivityTypes,
      storedData: data,
      handleSetData: handleSetData,
    });
  };

  const handleCategoryEdit = (categoryId, newName) => {
    if (newName.trim() === "") return;
    const updatedCategories = categories.map((storedCategory) => {
      if (storedCategory.id !== categoryId) return storedCategory;
      return { ...storedCategory, categoryName: newName.toUpperCase() };
    });
    localStorage.setItem("taskCraftData", JSON.stringify(updatedCategories));
    handleSetData(updatedCategories);
  };

  const CategoryRow = ({ category }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(
      category.categoryName
    );

    const handleSaveCategoryName = () => {
      if (newCategoryName.trim() !== "") {
        handleCategoryEdit(category.id, newCategoryName.trim());
        setIsEditing(false);
      }
    };

    const handleCancelEdit = () => {
      setNewCategoryName(category.categoryName);
      setIsEditing(false);
    };

    return (
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
          {isEditing ? (
            <span className="edit-name">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                readOnly={false}
              />
              <button
                className="close-button"
                style={{ borderRadius: "50%", padding: "3px 5px" }}
                onClick={handleCancelEdit}
              >
                <i className="fas fa-times"></i>
              </button>
            </span>
          ) : (
            <span>{category.categoryName}</span>
          )}
          <button
            className={isEditing ? "save-mode" : "edit-button"}
            title="Edit Activity"
            onClick={
              isEditing ? handleSaveCategoryName : () => setIsEditing(true)
            }
          >
            {isEditing ? "Save" : <i className="far fa-edit"></i>}
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
    );
  };

  return (
    <>
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <CategoryRow category={category} />
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
        </React.Fragment>
      ))}
      {showCategoryDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowCategoryDeleteModal}
          type="category"
          name={selectedCategory.categoryName}
          handleDelete={handleCategoryDelete}
        />
      )}
      {showActivityDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowActivityDeleteModal}
          type="activity"
          name={selectedActivity.activityName}
          handleDelete={handleActivityDelete}
        />
      )}
    </>
  );
};

export default Category;
