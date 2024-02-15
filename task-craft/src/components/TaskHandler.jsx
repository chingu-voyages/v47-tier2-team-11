export const createNewTask = (task, date, taskCountRef) => {
    const newTask = {
        id: taskCountRef.current + 1, // Generate a unique ID for the new task
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        priority: task.priority,
        status: task.status, // Assuming the initial status is false
        comments: "", // Assuming the initial comment is empty
        day: task.day,
        date: date,
        repetition: true // Assuming the new task is not repetitive
    }
    taskCountRef.current += 1
    return newTask
};

export const saveEditedPartToLocalStorage = (originalData, newData) => {
    const editedPart = {};
    for (const key in newData) {
        if (originalData[key] !== newData[key]) {
            editedPart[key] = newData[key];
        }
    }
    console.log("edited part....", editedPart)
    //localStorage.setItem('editedData', JSON.stringify(editedPart));
}


// TaskHandler.jsx
export const saveTasks = (tasks, categoryId, activityId) => {
    console.log("...task. task hanler..", tasks)
    console.log("...cat...id....task hanler..", categoryId)
    console.log("....act...id....task hanler...", activityId) // Corrected from categoryId to activityId

    

    // Find the category and activity based on IDs
    /*const updatedData = storedData.map(category => {
        // Check if the current category matches the categoryId
        if (category.id === categoryId) {
            console.log("...if match....", category)
            // Map through activityTypes to find the matching activityId
            const updatedActivityTypes = category.activityTypes.map(activity => {
                // Check if the current activity matches the activityId
                if (activity.id === activityId) {
                    console.log("...activity matched....")
                    // Add the task to the current activity
                    return {
                        ...activity,
                        tasks: [...activity.tasks, task]
                    };
                }
                return activity;
            });
            // Update the activityTypes for the current category
            return {
                ...category,
                activityTypes: updatedActivityTypes
            };
        }
        return category;
    });

    console.log("...updated....", taskCountRef)*/
    localStorage.setItem("userData", JSON.stringify(updatedData));
    
};
