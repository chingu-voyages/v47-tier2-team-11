import React from "react";
import { useEffect, useState } from "react";
import { isSameDay } from "date-fns";
import TaskCard from "./TaskCard";
import TaskDetail from "./TaskDetail";
import { saveToLocalStorage } from "./TaskHandler";
//import CommentModal from "./CommentModal";
import "./Task.css";
import setOccurrences from "./Occurrences";

const Task = ({
  storedData,
  handleSetData,
  categoryId,
  activityId,
  task,
  handleShowDeleteModal,
  datesAndDays,
  actName,
  catName,
}) => {
  const [taskState, setTaskState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    if (task) {
      task.repetition && !task.occurrences
        ? (task["occurrences"] = setOccurrences(task.day))
        : task;
      setTaskState(task);
    }
  }, []);

  const handleTaskStatusChange = (type, taskId, task) => {
    if (task.status === false) {
      setSelectedTask({
        type: type,
        taskId: taskId,
        task: task,
      });
      setShowModal(true);
    }

    let updatedTasks = taskState;
    switch (type) {
      case "occurrence":
        if (taskId === updatedTasks.id) {
          updatedTasks = {
            ...updatedTasks,
            occurrences: updatedTasks.occurrences.map((o) => {
              return o.date === task.date ? { ...o, status: !o.status } : o;
            }),
          };
        }
        break;

      case "task":
        if (taskId === updatedTasks.id) {
          updatedTasks = {
            ...updatedTasks,
            status: !updatedTasks.status,
          };
        }
        break;

      default:
        return updatedTasks;
    }

    setTaskState(updatedTasks);
    saveToLocalStorage({
      type: "task",
      categoryId,
      activityId,
      taskId,
      updatedData: updatedTasks,
      storedData,
      handleSetData,
    });
  };

  /*const handleSaveComment = (type, taskId, task, comment) => {
    if(comment !== "") {
      let updatedTasks = taskState
      switch(type) {
        case "occurrence":
          if (taskId === updatedTasks.id) {
            updatedTasks = {
              ...updatedTasks,
              occurrences: updatedTasks.occurrences.map((o) => {
                return o.date === task.date ? { ...o, comment: comment } : o;
              })
            }
          }
        break;
  
        case "task":
          if(taskId === updatedTasks.id) {
            updatedTasks = {
              ...updatedTasks,
              comment: comment
            }          
          }
        break;
  
        default:
          return updatedTasks;
      }  
       
      setTaskState(updatedTasks);
      saveToLocalStorage({type: "task", categoryId, activityId, taskId, updatedData: updatedTasks, storedData, handleSetData});  

    } 
    setShowModal(false) 
    
  };*/

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {taskState && (
        <tr key={taskState.id}>
          <td>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "spaceEvenly",
              }}
            >
              <TaskDetail
                task={taskState}
                actName={actName}
                catName={catName}
              />
              <button
                className="delete-button"
                style={{ marginLeft: "0.2em" }}
                title="Delete Task"
                onClick={() => handleShowDeleteModal(task)}
              >
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </td>
          {datesAndDays.map((date, dayIndex) => (
            <td key={`${taskState.id}-${dayIndex}`}>
              {taskState.occurrences ? (
                taskState.occurrences.map((occurrence) => {
                  return isSameDay(occurrence.date, date.date) ? (
                    <TaskCard
                      key={taskState.id}
                      taskId={taskState.id}
                      taskName={taskState.taskName}
                      data={occurrence}
                      type="occurrence"
                      handleTaskStatusChange={handleTaskStatusChange}
                    />
                  ) : null;
                })
              ) : isSameDay(taskState.date, date.date) ? (
                <TaskCard
                  key={taskState.id}
                  taskId={taskState.id}
                  taskName={taskState.taskName}
                  data={taskState}
                  type="task"
                  handleTaskStatusChange={handleTaskStatusChange}
                />
              ) : null}
            </td>
          ))}
        </tr>
      )}
      {/*showModal &&
    <CommentModal
       showModal = {showModal}
       selectedTask = {selectedTask}
       handleCloseModal={handleCloseModal}
       handleSaveComment={handleSaveComment}
    />
                */}
    </>
  );
};

export default Task;
