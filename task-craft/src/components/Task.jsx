import React, { useState, useEffect } from 'react';
import jsonData from '../assets/tasks.json';

export default function Task() {
  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let getLocalData = JSON.parse(localStorage.getItem('userData'));
    // Fetch data from the imported JSON file if no local data is present
    getLocalData ? setData(getLocalData) : setData(jsonData);
  }, []);

  useEffect(() => {
    if (data) {
      const allTasks = data.flatMap(category => category.activityTypes.flatMap(activity => activity.Tasks.map(task => task.taskName)));
      setTasks(allTasks);
    }
  }, [data]);

  return (
    <div className='taskcomponet'>
      <h2>Task Names</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
