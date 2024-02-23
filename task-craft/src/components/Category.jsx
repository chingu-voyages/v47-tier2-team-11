import React, { useEffect, useState } from "react";
import Activity from "./Activity";
import DeleteModal from "./deleteModal";
import { saveToLocalStorage } from "./TaskHandler";
import "./EditName.css"

const Category = ({ data, handleSetData, datesAndDays }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false)
  const [showActivityDeleteModal, setShowActivityDeleteModal] = useState(false)
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

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

 
  const handleActivityEdit = (category, activity, newName) => {
    if (newName.trim() === "") return; 
    const updatedActivityTypes = category.activityTypes.map(storedActivity => {
      if (storedActivity.id !== activity.id) return storedActivity; 
      return { ...storedActivity, activityName: newName.charAt(0).toUpperCase() + newName.slice(1) }
    })  
    saveToLocalStorage({ type: "category", categoryId: category.id, updatedData: updatedActivityTypes, storedData: data, handleSetData: handleSetData });
  };

  const handleSaveCategoryName = (category) => {
    if (newCategoryName.trim() !== "") {
      handleCategoryEdit(category, newCategoryName.trim());
      setIsCategoryEditing(false);
    }
  };
  
  const handleCancelEdit = () => {
    //setNewCategoryName(category.categoryName);
    setIsCategoryEditing(false);
  };

  const handleCategoryEdit = (category, newName) => {
    if (newName.trim() === "") return;
    const updatedCategory = categories.map(storedCategory => {
      if(storedCategory.id !== category.id) return storedCategory;
      return {...storedCategory, categoryName: newName.toUpperCase()}
    })
    localStorage.setItem("taskCraftData", JSON.stringify(updatedCategory));
    handleSetData(updatedCategory)    
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
               {isCategoryEditing ? (
              <span className="edit-name">
                <input
                  type="text"                  
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  readOnly={false} // Enable typing
                />
                <button
                  className="close-button"
                  style={{borderRadius: "50%", padding: "3px 5px"}}
                  onClick={handleCancelEdit}
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            ) : (
              <span>{category.categoryName}</span>
            )}
            <button
              className={isCategoryEditing ? 'save-mode' : 'edit-button'}
              title="Edit Activity"
              onClick={isCategoryEditing ? () => handleSaveCategoryName(category) : () => setIsCategoryEditing(true)}
            >
              {isCategoryEditing ? "Save" : <i className="far fa-edit"></i>}
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
