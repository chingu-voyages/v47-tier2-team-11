import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TaskDetail.css";
import { saveToLocalStorage } from "./TaskHandler";
import setOccurrences from "./Occurrences";
import { format } from "date-fns";

const TaskDetail = ({
  task: initialData,
  catName: category,
  actName: activity,
  categoryId,
  activityId,
  taskId,
  storedData,
  handleSetData
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskName: initialData.taskName,
    taskDescription: initialData.taskDescription,
    priority: initialData.priority,
    repetition: initialData.repetition,
    day: initialData.day,
    date: initialData.date,
  });
  const [edit, setEdit] = useState(false);
  const [editedTaskname, setEditedTaskname] = useState(taskDetails.taskName);
  const [editedDescription, setEditedDescription] = useState(
    taskDetails.taskDescription
  );
  const [editedPriority, setEditedPriority] = useState(taskDetails.priority);
  const [editedDueday, setEditedDueday] = useState(taskDetails.day);
  const [editedDuedate, setEditedDuedate] = useState(taskDetails.date);
  const [dueDateType, setDueDateType] = useState(
    taskDetails.date ? "onetime" : taskDetails.day || "daily"
  );

  useEffect(() => {
    setEditedDueday(initialData.day);
    setEditedDuedate(initialData.date);
  }, [initialData]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleTaskNameChange = (e) => {
    setEditedTaskname(e.target.value);
  };

  const handleChangeDay = (e) => {
    setEditedDueday(e.target.value);
  };

  const handleChangeDate = (e) => {
    setEditedDuedate(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setEditedPriority(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleDueDateTypeChange = (type) => {
    setDueDateType(type);
  };

  const handleSave = () => {
    setEdit(false);

    let repetition = dueDateType === "daily" || dueDateType === "weekly";
    let day =
      dueDateType === "daily"
        ? "daily"
        : dueDateType === "weekly"
        ? editedDueday
        : undefined;

    const updatedTaskDetails = {
      ...taskDetails,
      taskName: editedTaskname,
      taskDescription: editedDescription,
      priority: editedPriority,
      day: day,
      repetition: repetition,
      ...(repetition && { occurrences: setOccurrences(day) }),
      ...(!repetition && { date: editedDuedate || format(new Date(), "yyyy-MM-dd"), status: false }),
    };
      
    setTaskDetails(updatedTaskDetails);

    saveToLocalStorage({
      type: "task",
      categoryId,
      activityId,
      taskId,
      updatedData: updatedTaskDetails,
      storedData,
      handleSetData,
    });
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
    setEdit(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button className="openModalBtn" onClick={openModal}>
        {taskDetails.taskName}
      </button>

      <Modal
        className="TaskDetailModalStyles"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Task Details"
      >
        <div>
          <button className="btnClose" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>
          <h2 className="taskDetailHeading">Task Details</h2>

          <h3>
            Category: {category}
            <button
              className="editButton tasknameEditButton"
              onClick={handleEdit}
            >
              <i className="fas fa-edit"></i>
            </button>
          </h3>
          <h3>Activity: {activity}</h3>

          <div className="tasknamecontainer">
            <h4 className="taskname">
              {" "}
              Taskname:{" "}
              {edit ? (
                <input
                  className="tasknameInputContainer"
                  type="text"
                  defaultValue={taskDetails.taskName}
                  onBlur={handleTaskNameChange}
                />
              ) : (
                <> {taskDetails.taskName}</>
              )}
            </h4>
          </div>
          <h3>
            Description:{" "}
            {edit ? (
              <input
                type="text"
                className="inputDescriptionContainer"
                defaultValue={taskDetails.taskDescription}
                onBlur={handleDescriptionChange}
              />
            ) : (
              <>{taskDetails.taskDescription}</>
            )}
          </h3>
          <h3 className="taskpriority">
            Priority:{" "}
            {edit ? (
              <select
                className="inputContainer"
                defaultValue={taskDetails.priority}
                onBlur={handlePriorityChange}
              >
                <option value="default"> --select priority-- </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            ) : (
              <>
                {taskDetails.priority?.[0].toUpperCase() +
                  taskDetails.priority?.slice(1)}
              </>
            )}
          </h3>
          <h3>
            {"Due Date:"}
            {edit ? (
              <div>
                <input
                  type="radio"
                  id="daily"
                  name="dueDate"
                  value="daily"
                  checked={dueDateType === "daily"}
                  onChange={() => handleDueDateTypeChange("daily")}
                />
                <label htmlFor="daily">Daily</label>
                <input
                  type="radio"
                  id="weekly"
                  name="dueDate"
                  value="weekly"
                  checked={dueDateType === "weekly"}
                  onChange={() => handleDueDateTypeChange("weekly")}
                />
                <label htmlFor="weekly">Weekly</label>
                <input
                  type="radio"
                  id="onetime"
                  name="dueDate"
                  value="onetime"
                  checked={dueDateType === "onetime"}
                  onChange={() => handleDueDateTypeChange("onetime")}
                />
                <label htmlFor="onetime">One-time</label>
                {dueDateType === "onetime" && (
                  <input
                    type="date"
                    value={editedDuedate || format(new Date(), "yyyy-MM-dd")}
                    onChange={handleChangeDate}
                  />
                )}
                {dueDateType === "weekly" && (
                  <select
                    value={editedDueday}
                    onChange={handleChangeDay}
                    onBlur={handleChangeDay}
                  >
                    <option value="">Select Day</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                )}
              </div>
            ) : (
              <>
                {" "}
                {taskDetails.day === "daily" ? (
                  <span>
                    Repeats{" "}
                    {taskDetails.day?.[0].toUpperCase() +
                      taskDetails.day?.slice(1)}
                  </span>
                ) : taskDetails.repetition === true ? (
                  <span>
                    Repeats on{" "}
                    {taskDetails.day?.[0].toUpperCase() +
                      taskDetails.day?.slice(1)}
                  </span>
                ) : (
                  <span>On{":  "}</span>
                )}
              </>
            )}
          </h3>
          {edit && (
            <button className="saveBtn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default TaskDetail;
