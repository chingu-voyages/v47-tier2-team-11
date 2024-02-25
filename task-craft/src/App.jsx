import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import DateComponent from "./components/DateComponent";
import Category from "./components/Category";
import Footer from "./components/Footer";
import jsonData from "./assets/taskData.json";
import "./App.css";
import "./components/Modal.css";

const App = () => {
  const [data, setData] = useState(null);
  const [datesAndDays, setDatesAndDays] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [resetMessage, setResetMessage] = useState("");
  useEffect(() => {
    //localStorage.removeItem("taskCraftData")
    const localData = JSON.parse(localStorage.getItem("taskCraftData"));
    setInitialData(localData || jsonData);
    localData
      ? setData(localData)
      : (setData(jsonData),
        localStorage.setItem("taskCraftData", JSON.stringify(jsonData)));
  }, []);

  const handleSetData = (updatedData) => {
    setData(updatedData);
    localStorage.setItem("taskCraftData", JSON.stringify(updatedData));
  };
  const handleResetData = () => {
    setData(initialData);
    localStorage.setItem("taskCraftData", JSON.stringify(initialData));
    setResetMessage("Data has been reset successfully!");
    setTimeout(() => setResetMessage(""), 5000);
  };
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
      generatedDatesAndDays.push({
        date,
        dayOfWeek,
        dayOfMonth,
        fullDayOfWeek,
      });
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
      <Header
        data={data}
        handleSetData={handleSetData}
        handleResetData={handleResetData}
        resetMessage={resetMessage}
      />
      <div style={{ overflowX: "auto", maxHeight: "79vh", maxWidth: "100%" }}>
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
              datesAndDays={datesAndDays}
            />
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default App;
