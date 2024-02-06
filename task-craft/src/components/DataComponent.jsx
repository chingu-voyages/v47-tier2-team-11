import React, { useState, useEffect } from "react";

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the imported JSON file
    const fetchData = async () => {
      const response = await import("../assets/tasks.json");
      setData(response.default);
    };

    fetchData();
  }, []);

  return (
    <div>
      <table>
        <tbody>
          {data.map((category, index) => (
            <React.Fragment key={index}>
              <tr>
                <td colSpan="3"><strong>{category.categoryName}</strong></td>
              </tr>
              {category.activityTypes.map((activity, activityIndex) => (
                <React.Fragment key={`${index}-${activityIndex}`}>
                  <tr>
                    <td></td>
                    <td>{activity.activityName}</td>
                    <td></td>
                  </tr>
                  {activity.Tasks.map((task, taskIndex) => (
                    <tr key={`${index}-${activityIndex}-${taskIndex}`}>
                      <td></td>
                      <td></td>
                      <td>{task.taskName}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataComponent;
