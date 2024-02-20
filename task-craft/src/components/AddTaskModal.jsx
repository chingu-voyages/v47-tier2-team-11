import { useState } from "react";
import "./AddTaskModal.css";
import setOccurrences from "./Occurrences";

const AddTaskModal = ({ data, handleCloseModal }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("daily");
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("low");

  const handleSaveTask = () => {
    let repetition = dueDate === "daily" || dueDate === "weekly";
    let day =
      dueDate === "daily"
        ? "daily"
        : dueDate === "weekly"
        ? selectedDayOfWeek
        : undefined;
    const task = {
      taskName: taskName,
      taskDescription: taskDescription,
      priority: selectedPriority,
      day: day,
      repetition: repetition,
      ...(repetition && { occurrences: setOccurrences(day) }),
      ...(!repetition && { date: selectedDate }),
    };
    if ("day" in task && task.day === undefined) {
      delete task.day;
    }
    console.log(task);
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal-content">
        <div className="task-modal-header">
          <p>Add New Task</p>
          <button className="task-modal-close" onClick={handleCloseModal}>
            X
          </button>
        </div>
        <div className="task-modal-body">
          <div className="form-group">
            <label id="categoryLabel">Select the Category: </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                const intValue = parseInt(e.target.value, 10);
                setSelectedCategory(intValue);
              }}
              aria-labelledby="categoryLabel"
            >
              <option value="">Select Category...</option>
              {data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label id="activityLabel">Select the Activity: </label>
            <select
              value={selectedActivity}
              onChange={(e) => {
                const intValue = parseInt(e.target.value, 10);
                setSelectedActivity(intValue);
              }}
              disabled={!selectedCategory}
              aria-labelledby="activityLabel"
            >
              <option value="">Select Activity...</option>
              {data.map((category) => {
                if (category.id === selectedCategory) {
                  return category.activityTypes.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.activityName}
                    </option>
                  ));
                }
                return null;
              })}
            </select>
          </div>
          <div className="form-group">
            <label id="taskNameLabel">Task Name: </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name..."
              aria-labelledby="taskNameLabel"
            />
          </div>
          <div className="form-group">
            <label id="taskDescriptionLabel">Task Description: </label>
            <textarea
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description..."
              aria-labelledby="taskDescriptionLabel"
            />
          </div>
          <div className="form-group">
            <label id="priorityLabel">Select Priority: </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              aria-labelledby="priorityLabel"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="form-group">
            <label id="dueDateLabel">Due Date: </label>
            <div>
              <input
                type="radio"
                id="daily"
                name="dueDate"
                value="daily"
                checked={dueDate === "daily"}
                onChange={() => setDueDate("daily")}
                aria-labelledby="dueDateLabel"
              />
              <label htmlFor="daily">Daily</label>
            </div>
            <div>
              <input
                type="radio"
                id="weekly"
                name="dueDate"
                value="weekly"
                checked={dueDate === "weekly"}
                onChange={() => setDueDate("weekly")}
              />
              <label htmlFor="weekly">Weekly</label>
              {dueDate === "weekly" && (
                <select
                  value={selectedDayOfWeek}
                  onChange={(e) => setSelectedDayOfWeek(e.target.value)}
                  aria-labelledby="dueDateLabel"
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
            <div>
              <input
                type="radio"
                id="onetime"
                name="dueDate"
                value="onetime"
                checked={dueDate === "onetime"}
                onChange={() => setDueDate("onetime")}
              />
              <label htmlFor="onetime">One-time</label>
              {dueDate === "onetime" && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  aria-labelledby="dueDateLabel"
                />
              )}
            </div>
          </div>
          <button className="save-button" onClick={handleSaveTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
