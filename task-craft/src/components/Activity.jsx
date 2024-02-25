import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import Task from "./Task";
import { saveToLocalStorage } from "./TaskHandler";
import "./EditName.css";

const Activity = ({
  storedData,
  handleSetData,
  activityData,
  category,
  datesAndDays,
  handleShowActivityDeleteModal,
  handleActivityEdit,
  catName,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newActivityName, setNewActivityName] = useState(
    activityData.activityName
  );
  const [selectedTask, setSelectedTask] = useState(null);

  const handleShowDeleteModal = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleTaskDelete = (task) => {
    // Filter out the selected task from the activityData tasks
    const updatedTasks = activityData.tasks.filter(
      (storedTask) => storedTask.id !== selectedTask.id
    );
    // Create a new copy of activityData with updated tasks
    saveToLocalStorage({
      type: "activity",
      categoryId: category.id,
      activityId: activityData.id,
      updatedData: updatedTasks,
      storedData,
      handleSetData,
    });
    setShowDeleteModal(false);
  };

  const handleSaveActivityName = () => {
    if (newActivityName.trim() !== "") {
      handleActivityEdit(category, activityData, newActivityName.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setNewActivityName(activityData.activityName);
    setIsEditing(false);
  };

  return (
    <>
      <React.Fragment key={activityData.id}>
        <tr>
          <td
            colSpan="31"
            style={{
              backgroundColor: "#00473e",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "3px 5px",
            }}
          >
            {isEditing ? (
              <span className="edit-name">
                <input
                  type="text"
                  value={newActivityName}
                  onChange={(e) => setNewActivityName(e.target.value)}
                  readOnly={false} // Enable typing
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
              <span>{activityData.activityName}</span>
            )}
            <button
              className={isEditing ? "save-mode" : "edit-button"}
              title="Edit Activity"
              onClick={
                isEditing ? handleSaveActivityName : () => setIsEditing(true)
              }
            >
              {isEditing ? "Save" : <i className="far fa-edit"></i>}
            </button>
            <button
              className="delete-button"
              title="Delete Activity"
              onClick={() =>
                handleShowActivityDeleteModal(category, activityData)
              }
            >
              <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        {activityData.tasks.map((task) => (
          <Task
            key={task.id}
            storedData={storedData}
            handleSetData={handleSetData}
            categoryId={category.id}
            activityId={activityData.id}
            task={task}
            handleShowDeleteModal={handleShowDeleteModal}
            datesAndDays={datesAndDays}
            actName={activityData.activityName}
            catName={catName}
          />
        ))}
        {showDeleteModal && (
          <DeleteModal
            setShowDeleteModal={setShowDeleteModal}
            type="task"
            name={selectedTask.taskName}
            handleDelete={handleTaskDelete}
          />
        )}
      </React.Fragment>
    </>
  );
};

export default Activity;
