import React, { useState } from "react";
import DeleteModal from "./deleteModal";
import Task from "./Task";
import { saveToLocalStorage } from "./TaskHandler";

const Activity = ({ storedData, handleSetData, activityData, categoryId, datesAndDays, handleActivityEdit, handleActivityDelete}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleShowDeleteModal = (task) => {
    setSelectedTask(task)
    setShowDeleteModal(!showDeleteModal)
  };

  const handleTaskDelete = () => {
    // Filter out the selected task from the activityData tasks
    const updatedTasks = activityData.tasks.filter(task => task.id !== selectedTask.id)
    // Create a new copy of activityData with updated tasks
    saveToLocalStorage({type: "activity", categoryId, activityId: activityData.id, taskId: null, updatedData: updatedTasks, storedData, handleSetData})
    setShowDeleteModal(false)
  }
  
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
            {activityData.activityName}
            <button
              className="edit-button"
              title="Edit Activity"
              onClick={() => handleActivityEdit(activityData)}
            >
              <i className="far fa-edit"></i>
            </button>
            <button
              className="delete-button"
              title="Delete Activity"
              onClick={() => handleActivityDelete(activityData)}
            >
              <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
        {activityData.tasks.map((task) => 
          (
            <Task
              key={task.id}
              storedData={storedData}
              handleSetData={handleSetData}
              categoryId={categoryId}
              activityId={activityData.id}
              task={task}
              handleShowDeleteModal={handleShowDeleteModal}
              datesAndDays={datesAndDays}
            />
          )
        )}
        {showDeleteModal && 
          <DeleteModal 
            setShowDeleteModal={setShowDeleteModal}
            selectedTask={selectedTask}
            handleTaskDelete = {handleTaskDelete}/>
        }

      </React.Fragment>
    </>
  );
};

export default Activity;
