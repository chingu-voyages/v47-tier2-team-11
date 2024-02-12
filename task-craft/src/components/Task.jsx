import React, { useEffect, useState } from "react";
const Task = ({ activity, datesAndDays }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    if (activity) {
      setTasks(activity);
    }
  }, [activity]);

  return (
    <>
      {tasks.map((item, index) => (
        <React.Fragment key={`task-fragment-${index}`}>
          <tr>
            <td key={index}>{item.taskName}</td>
            {datesAndDays.map((day, dayIndex) => (
              <td key={dayIndex}>
                {item.days.includes(day.dayOfMonth.toString()) ||
                item.days.includes(day.fullDayOfWeek.toLowerCase()) ? (
                  <input type="checkbox" checked={false} readOnly />
                ) : null}
              </td>
            ))}
          </tr>
        </React.Fragment>
      ))}
    </>
  );
};

export default Task;
