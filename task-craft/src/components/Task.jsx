import React from "react";
import { useEffect, useState } from "react"
import { nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday, nextSunday, startOfDay, startOfMonth, lastDayOfMonth, addWeeks, isSameDay, addDays } from "date-fns";
import TaskCard from "./TaskCard";
import { saveEditedPartToLocalStorage } from "./TaskHandler";
import "./Task.css";

const Task = ({ storedData, tasks, datesAndDays}) => {
  const currentDate = new Date()
  const startDateOfMonth = startOfMonth(currentDate)
  const lastDateOfMonth = lastDayOfMonth(currentDate)
  const [taskState, setTaskState] = useState(null);

  useEffect(() => {
    if (tasks) {  
      tasks.forEach((task) => {
        task.repetition ? task["occurences"] = setOccurences(task.day) : null
      })
      setTaskState(tasks)
    }
  }, [tasks]);

  const setOccurences = (occurenceDay) => {
    let date = currentDate
    let startDate = startDateOfMonth
    let lastDate = lastDateOfMonth
    let occurences = []
    switch(occurenceDay) {
      case "daily":
        for(let i = startDate; i <= lastDate; i = addDays(i, 1)) {          
          occurences.push({date: i,
            status: false})
          startDate = addDays(i, 1)         
          date = addDays(date, 1)
        }
        break;
      case "monthly":
        break;
      default:
        const nextDayFunction = eval(`next${occurenceDay.charAt(0).toUpperCase() + occurenceDay.slice(1).toLowerCase()}`);
        for(let i = startDate; i < lastDate; i = addWeeks(i, 1)) {
          let nextTaskDate = startOfDay(nextDayFunction(i))
          occurences.push({date: nextTaskDate,
            status: false})
          startDate = nextTaskDate
          date = addWeeks(date, 1)
        }

        break;
    }

    return occurences
  }

  const handleRepetitionTaskStatusChange = (occurence) => {
    const updatedTasks = taskState.map(task => ({
      ...task,
      occurences: task.occurences.map(o => o.date === occurence.date ? { ...o, status: true } : o)
    }));
    setTaskState(updatedTasks);
  }

  const handleNotRepetitionTaskStatusChange = (task) => {
    const updatedTasks = taskState.map(storedTask =>
        storedTask.id === task.id
            ? { ...storedTask, status: true }
            : storedTask
    );
    setTaskState(updatedTasks);
  };

  return (
    <>
    {taskState && taskState.map((task) => (
    <tr key={task.id}>
    <td>{task.taskName}</td>     
      {datesAndDays.map((date, dayIndex) => (
        <td key={`${task.id}-${dayIndex}`}>
          {task.occurences ? task.occurences.map((occurence) => {
          return (isSameDay(occurence.date, date.date)) ? (
              <TaskCard 
                key={`${task.id}-${occurence.date}`} 
                taskName={task.taskName} 
                data={occurence}
                type="occurence"
                handleTaskStatusChange={handleRepetitionTaskStatusChange}/>
          ) : null
          }) : 
          (isSameDay(task.date, date.date) ? (
              <TaskCard 
                key={`${task.id}-${date.date}`} 
                taskName={task.taskName} 
                data={task}
                type="task"
                handleTaskStatusChange={handleNotRepetitionTaskStatusChange}/>
          ) : null)}
        </td>
      ))}
  </tr>
  ))}
  </>
  )
}

export default Task;