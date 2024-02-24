import React, { useState } from "react";
import Modal from "react-modal";
import "./TaskDetail.css";
import { format } from "date-fns";

const TaskDetail = ({
  task: initialData,
  catName: category,
  actName: activity,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    taskname: initialData.taskName,
    taskdescription: initialData.taskDescription,
    priority: initialData.priority,
    repetition: initialData.repetition,
    day: initialData.day,
    date: initialData.date,
  });
  const [edit, setEdit] = useState(false);
  const [editedTaskname, setEditedTaskname] = useState(taskDetails.taskname);
  const [editedDescription, setEditedDescription] = useState(
    taskDetails.taskDescription
  );
  const [editedPriority, setEditedPriority] = useState(taskDetails.priority);
  const [editedDueday, setEditedDueday] = useState(taskDetails.day);
  const [editedDuedate, setEditedDuedate] = useState(taskDetails.date);

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

  const handleSave = () => {
    setEdit(false);
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      taskname: editedTaskname,
      taskdescription: editedDescription,
      priority: editedPriority,
      day: editedDueday,
      date: editedDuedate,
    }));
    setModalIsOpen(false); // closing modal after saving
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
        {taskDetails.taskname}
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
                  defaultValue={taskDetails.taskname}
                  onBlur={handleTaskNameChange}
                />
              ) : (
                <> {taskDetails.taskname}</>
              )}
            </h4>
          </div>
          <h3>
            Description:{" "}
            {edit ? (
              <input
                type="text"
                className="inputDescriptionContainer"
                defaultValue={taskDetails.taskdescription}
                onBlur={handleDescriptionChange}
              />
            ) : (
              <>{taskDetails.taskdescription}</>
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
              taskDetails.day ? (
                <select
                  className="inputContainer"
                  defaultValue={taskDetails.day}
                  onBlur={handleChangeDay}
                >
                  <option value="default"> --select day-- </option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              ) : (
                <>
                  {taskDetails.day}
                  {taskDetails.date && taskDetails.repetition === false
                    ? format(new Date(taskDetails.date), "yyyy-MM-dd")
                    : ""}

                  <br />
                </>
              )
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
                  <span>One Time Event{":  "}</span>
                )}
              </>
            )}
            {edit ? (
              taskDetails.date ? (
                <input
                  className="inputContainer dateInput"
                  type="date"
                  onBlur={handleChangeDate} // Updating the state when the value is changed
                  defaultValue={
                    taskDetails.date
                      ? format(new Date(taskDetails.date), "yyyy-MM-dd")
                      : ""
                  }
                />
              ) : (
                <>
                  {taskDetails.date
                    ? format(new Date(taskDetails.date), "yyyy-MM-dd")
                    : ""}
                </>
              )
            ) : (
              <>
                {taskDetails.date
                  ? format(new Date(taskDetails.date), "yyyy-MM-dd")
                  : ""}
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