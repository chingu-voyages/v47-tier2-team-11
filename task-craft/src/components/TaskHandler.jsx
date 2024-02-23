export const saveToLocalStorage = ({
  type,
  categoryId,
  activityId,
  taskId,
  updatedData,
  storedData,
  handleSetData,
}) => {
  let updatedStoredData = [];

  switch (type) {
    case "category":
      updatedStoredData = storedData.map((category) =>
        category.id === updatedData.id
          ? { ...category, ...updatedData }
          : category
      );
      break;
    case "activity":
      updatedStoredData = storedData.map((category) => ({
        ...category,
        activityTypes: category.activityTypes.map((activity) =>
          activity.id === activityId
            ? { ...activity, ...updatedData }
            : activity
        ),
      }));
      break;
    case "task":
      updatedStoredData = storedData.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              activityTypes: category.activityTypes.map((activity) =>
                activity.id === activityId
                  ? {
                      ...activity,
                      tasks: activity.tasks.map((task) =>
                        task.id === taskId ? updatedData : task
                      ),
                    }
                  : activity
              ),
            }
          : category
      );
      break;
    default:
      updatedStoredData = storedData;
  }

  handleSetData(updatedStoredData);
};
