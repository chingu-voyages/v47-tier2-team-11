import { useState } from "react";
import "./AddTaskModal.css";
import AddCategoryModal from "./AddCategoryModal";
import AddActivityModal from "./AddActivityModal";
import setOccurrences from "./Occurrences";

const AddTaskModal = ({ data, handleCloseModal, handleSetData }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("daily");
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("low");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const handleAddNewCategory = (newCategoryName) => {
    let maxCategoryId = 0;
    data.forEach((category) => {
      maxCategoryId = Math.max(maxCategoryId, category.id);
    });

    const updatedDataWithNewCategory = [
      ...data,
      {
        id: maxCategoryId + 1,
        categoryName: newCategoryName,
        activityTypes: [],
      },
    ];

    handleSetData(updatedDataWithNewCategory);
  };

  const handleAddNewActivity = (newActivityName) => {
    const selectedCategoryObject = data.find(
      (category) => category.id === selectedCategory
    );
    let maxActivityId = 0;
    selectedCategoryObject.activityTypes.forEach((activity) => {
      maxActivityId = Math.max(maxActivityId, activity.id);
    });

    const updatedDataWithNewActivity = data.map((category) => {
      if (category.id === selectedCategory) {
        return {
          ...category,
          activityTypes: [
            ...category.activityTypes,
            {
              id: maxActivityId + 1,
              activityName: newActivityName,
              tasks: [],
            },
          ],
        };
      }
      return category;
    });

    handleSetData(updatedDataWithNewActivity);
  };

  const handleSaveTask = () => {
    let repetition = dueDate === "daily" || dueDate === "weekly";
    let day =
      dueDate === "daily"
        ? "daily"
        : dueDate === "weekly"
        ? selectedDayOfWeek
        : undefined;

    const selectedCategoryObject = data.find(
      (category) => category.id === selectedCategory
    );

    let maxTaskId = 0;
    let selectedActivityObject = undefined;

    if (selectedCategoryObject) {
      selectedActivityObject = selectedCategoryObject.activityTypes.find(
        (activity) => activity.id === selectedActivity
      );

      if (selectedActivityObject && selectedActivityObject.tasks) {
        selectedActivityObject.tasks.forEach((existingTask) => {
          maxTaskId = Math.max(maxTaskId, existingTask.id);
        });
      }
    }

    const newTask = {
      id: maxTaskId + 1,
      taskName: taskName,
      taskDescription: taskDescription,
      priority: selectedPriority,
      day: day,
      repetition: repetition,
      ...(repetition && { occurrences: setOccurrences(day) }),
      ...(!repetition && { date: selectedDate, status: false }),
    };

    if ("day" in newTask && newTask.day === undefined) {
      delete newTask.day;
    }
    const updatedDataWithNewTask = data.map((category) => {
      if (category.id === selectedCategory) {
        return {
          ...category,
          activityTypes: category.activityTypes.map((activity) => {
            if (activity.id === selectedActivity) {
              return {
                ...activity,
                tasks: [...activity.tasks, newTask],
              };
            }
            return activity;
          }),
        };
      }
      return category;
    });

    handleSetData(updatedDataWithNewTask);
    handleCloseModal();
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
            <button
              title="Add New Category"
              className="add-new-button"
              onClick={() => setShowCategoryModal(true)}
            >
              <i className="fas fa-plus icon"></i>
            </button>
            {showCategoryModal && (
              <AddCategoryModal
                setShowModal={setShowCategoryModal}
                handleAddNewCategory={handleAddNewCategory}
              />
            )}
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
            <button
              title="Add New Activity"
              className="add-new-button"
              onClick={() => setShowActivityModal(true)}
              disabled={!selectedCategory}
            >
              <i className="fas fa-plus icon"></i>
            </button>
            {showActivityModal && (
              <AddActivityModal
                setShowModal={setShowActivityModal}
                handleAddNewActivity={handleAddNewActivity}
              />
            )}
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
