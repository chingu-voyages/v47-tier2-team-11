import React from "react";
import { useEffect, useState } from "react"
import { nextMonday, nextTuesday, nextWednesday, nextThursday, nextFriday, nextSaturday, nextSunday, startOfDay, startOfMonth, lastDayOfMonth, addWeeks, isSameDay, addDays } from "date-fns";
import TaskCard from "./TaskCard";
import "./Task.css";

const Task = ({ storedData, tasks, datesAndDays}) => {
  const currentDate = new Date()
  const startDateOfMonth = startOfMonth(currentDate)
  const lastDateOfMonth = lastDayOfMonth(currentDate)
  const [taskState, setTaskState] = useState(null);

  useEffect(() => {
    if (tasks) {  
      tasks.forEach((task) => {
        task.repetition ? task["occurrences"] = setOccurrences(task.day) : null
      })
      setTaskState(tasks)
    }
  }, [tasks]);

  const setOccurrences = (occurrenceDay) => {
    let date = currentDate
    let startDate = startDateOfMonth
    let lastDate = lastDateOfMonth
    let occurrences = []
    switch(occurrenceDay) {
      case "daily":
        for(let i = startDate; i <= lastDate; i = addDays(i, 1)) {          
          occurrences.push({date: i,
            status: false})
          startDate = addDays(i, 1)         
          date = addDays(date, 1)
        }
        break;
      case "monthly":
        break;
      default:
        const nextDayFunction = nextDayFunctions[occurrenceDay.toLowerCase()];

        for(let i = startDate; i < lastDate; i = addWeeks(i, 1)) {
          let nextTaskDate = startOfDay(nextDayFunction(i))
          occurrences.push({date: nextTaskDate,
            status: false})
          startDate = nextTaskDate
          date = addWeeks(date, 1)
        }

        break;
    }

    return occurrences
  }

  const nextDayFunctions = {
    monday: nextMonday,
    tuesday: nextTuesday,
    wednesday: nextWednesday,
    thursday: nextThursday,
    friday: nextFriday,
    saturday: nextSaturday,
    sunday: nextSunday
  };
  

  const handleRepetitionTaskStatusChange = (occurrence) => {
    const updatedTasks = taskState.map(task => ({
      ...task,
      occurrences: task.occurrences.map(o => o.date === occurrence.date ? { ...o, status: true } : o)
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
          {task.occurrences ? task.occurrences.map((occurrence) => {
          return (isSameDay(occurrence.date, date.date)) ? (
              <TaskCard 
                key={`${task.id}-${occurrence.date}`} 
                taskName={task.taskName} 
                data={occurrence}
                type="occurrence"
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