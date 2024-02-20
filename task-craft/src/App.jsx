import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import DateComponent from "./components/DateComponent";
import Category from "./components/Category";
import jsonData from "./assets/taskData.json";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [datesAndDays, setDatesAndDays] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState("");

  useEffect(() => {
    //localStorage.removeItem("taskCraftData")
    const localData = JSON.parse(localStorage.getItem("taskCraftData"));
    localData ? setData(localData) : (setData(jsonData), localStorage.setItem("taskCraftData", JSON.stringify(jsonData)));
  }, []);

  const handleSetData = (updatedData) => {
    console.log("...updated data to be saved in local storage........", updatedData)
    setData(updatedData)
  }

  // Generate dates and days for the current month
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const generatedDatesAndDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth - 1, i);
      const dayOfWeek = date.toLocaleDateString("default", {
        weekday: "narrow",
      });
      const fullDayOfWeek = date.toLocaleDateString("default", {
        weekday: "long",
      });
      const dayOfMonth = date.getDate();
      generatedDatesAndDays.push({ date, dayOfWeek, dayOfMonth, fullDayOfWeek });
    }
    setMonthAndYear(
      `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentYear}`
    );
    setDatesAndDays(generatedDatesAndDays);
  }, []);

  return (
    <>
      <Header />
      <table>
        <thead>
          <tr>
            <DateComponent
              datesAndDays={datesAndDays}
              monthAndYear={monthAndYear}
            />
          </tr>
        </thead>
        <tbody>
          <Category 
            data={data} 
            handleSetData={handleSetData}
            datesAndDays={datesAndDays} />
        </tbody>
      </table>
    </>
  );
};

export default App;
