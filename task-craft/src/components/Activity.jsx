import React, { useEffect, useState } from "react";
import Task from "./Task";

const Activity = ({ categoryData, datesAndDays }) => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    if (categoryData) {
      const activity = categoryData.activityTypes.map((item) => item);
      setActivities(activity);
    }
  }, [categoryData]);

  return (
    <>
      {activities.map((item, index) => (
        <>
          <tr>
            <td key={index} style={{ fontWeight: "bold", color: "#4CB9E7" }}>
              {item.activityName}
            </td>
          </tr>
          <Task activity={item.Tasks} datesAndDays={datesAndDays} />
        </>
      ))}
    </>
  );
};

export default Activity;
