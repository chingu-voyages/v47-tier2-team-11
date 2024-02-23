import React, { useState } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
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

  const handleEdit = () => {
    setEdit(true);
  };

  const handleTaskNameChange = (e) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      taskname: e.target.value,
    }));
  };

  const handleChangeDay = (e) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      day: e.target.value,
    }));
  };

  const handleChangeDate = (e) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      date: e.target.value,
    }));
  };

  const handlePriorityChange = (e) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      priority: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      taskdescription: e.target.value,
    }));
  };

  const handleSave = () => {
    setEdit(false);
    setModalIsOpen(false); // closing modal after saving
  };

  const openModal = () => {
    setModalIsOpen(true);
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
          <button className="btn-close btnClose" onClick={closeModal}></button>
          <h2 className="taskDetailHeading">Task Details</h2>

          <h5>Category: {category}</h5>
          <h5>Activity: {activity}</h5>

          <div className="tasknamecontainer">
            <h3 className="taskname">
              {edit ? (
                <input
                  className="tasknameInputContainer"
                  type="text"
                  defaultValue={taskDetails.taskname}
                  onBlur={handleTaskNameChange}
                />
              ) : (
                <>
                  {taskDetails.taskname}
                  <button
                    className="editButton tasknameEditButton"
                    onClick={handleEdit}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </>
              )}
            </h3>
          </div>
          <h5>
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
          </h5>
          <h5 className="taskpriority">
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
          </h5>
          <h5 className="dueDate">
            {/* {taskDetails.repetition ? <h5> Repeat</h5> : <h5> Non Repeat </h5>} */}
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
                {taskDetails.date}{" "}
                {/* {taskDetails.day?.[0].toUpperCase() + taskDetails.day?.slice(1)} */}
                {/* for date it gives NaN */}
                {taskDetails.day}
                {taskDetails.day === "daily" ? (
                  <span>
                    <br />
                    Repeats{" "}
                    {taskDetails.day?.[0].toUpperCase() +
                      taskDetails.day?.slice(1)}
                  </span>
                ) : taskDetails.repetition === true ? (
                  <span>
                    <br />
                    Repeats on{" "}
                    {taskDetails.day?.[0].toUpperCase() +
                      taskDetails.day?.slice(1)}
                  </span>
                ) : (
                  <span>
                    <br />
                    One Time Event{":  "}
                  </span>
                )}
              </>
            )}
            {edit ? (
              taskDetails.date ? (
                <input
                  className="inputContainer dateInput"
                  type="date"
                  onBlur={handleChangeDate} // Update the state when the value changes
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
          </h5>

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
