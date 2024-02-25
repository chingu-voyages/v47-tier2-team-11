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
  saveTaskToState,
  handleSetData,
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
      ...(!repetition && {
        date: editedDuedate || format(new Date(), "yyyy-MM-dd"),
        status: false,
      }),
    };

    setTaskDetails(updatedTaskDetails);
    saveTaskToState(updatedTaskDetails)

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

          <div className="categoryContainer">
            Category: {category}
            <button
              className="editButton tasknameEditButton"
              onClick={handleEdit}
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <div className="activityContainer">Activity: {activity}</div>

          <div className="tasknamecontainer">
            <div className="taskname">
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
            </div>
          </div>
          <div className="descriptionContainer">
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
          </div>
          <div className="taskpriority priorityContainer">
            Priority:{" "}
            {edit ? (
              <select
                className="inputPriorityContainer"
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
          </div>
          <div className="duedateContainer">
            {"Due Date:"}
            {edit ? (
              <div className="editingDuedateContainer">
                <div>
                  <input
                    type="radio"
                    id="daily"
                    // className="dailyRadio"
                    name="dueDate"
                    value="daily"
                    checked={dueDateType === "daily"}
                    onChange={() => handleDueDateTypeChange("daily")}
                  />
                  <label htmlFor="daily">Daily</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="weekly"
                    name="dueDate"
                    value="weekly"
                    checked={dueDateType === "weekly"}
                    onChange={() => handleDueDateTypeChange("weekly")}
                  />
                  <label htmlFor="weekly">Weekly</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="onetime"
                    className="onetimeRadio"
                    name="dueDate"
                    value="onetime"
                    checked={dueDateType === "onetime"}
                    onChange={() => handleDueDateTypeChange("onetime")}
                  />
                  <label htmlFor="onetime">One-time</label>
                </div>
                {dueDateType === "onetime" && (
                  <input
                    className="inputOneTimeContainer"
                    type="date"
                    value={editedDuedate || format(new Date(), "yyyy-MM-dd")}
                    onChange={handleChangeDate}
                  />
                )}
                {dueDateType === "weekly" && (
                  <select
                    className="inputWeeklyContainer"
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
                  <span>
                    On{" "} {taskDetails.date}
                  </span>
                )}
              </>
            )}
          </div>
          <div className="saveButtonContainer">
            {edit && (
              <button className="saveBtn" onClick={handleSave}>
                Save
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskDetail;
