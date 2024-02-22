export const saveToLocalStorage = ({ type, categoryId, activityId, taskId, updatedData, storedData, handleSetData }) => {
  console.log("...in task handler...type", type)
  console.log("...t.h....cat id....", categoryId)
  console.log(".....t...h...act id....", activityId)
  console.log("....t...h....taskId....", taskId)
  console.log("...t...h.....updated data", updatedData)
  console.log("....stored data....", storedData)
  console.log("...t...h...hadle set data...", handleSetData)
  let updatedStoredData = [];

  switch (type) {
    case "category":
      updatedStoredData = storedData.map(category =>
        category.id === updatedData.id ? { ...updatedData } : category
      );
      break;
    case "activity":
      updatedStoredData = storedData.map(category => ({
        ...category,
        activityTypes: category.activityTypes.map(activity =>
          activity.id === activityId ? {...activity, tasks: updatedData} : activity
        )
      }));
      break;
    case "task":
      updatedStoredData = storedData.map(category => 
        category.id === categoryId ? {
          ...category,
          activityTypes: category.activityTypes.map(activity => 
            activity.id === activityId ? {
              ...activity,
              tasks: activity.tasks.map(task => 
                task.id === taskId ? updatedData : task
              )
            } : activity)
          } : category
      )
      break;
    default:
      updatedStoredData = storedData;
  }

  console.log("....after deleting/ editing......", updatedStoredData)
  handleSetData(updatedStoredData);
  localStorage.setItem("taskCraftData", JSON.stringify(updatedStoredData));
};

