import { useEffect, useState } from "react";
import Header from "./components/Header";
import DateComponent from "./components/DateComponent";
import Category from "./components/Category";
import jsonData from "./assets/tasks.json";
import "./App.css";
const App = () => {
  const [data, setData] = useState(null);
  const [datesAndDays, setDatesAndDays] = useState([]);
  const [monthAndYear, setMonthAndYear] = useState("");
  /**
   * Generates dates and days for the current month and sets the result.
   */
  function generateDateAndDays() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the current month number (0-indexed)
    const currentYear = currentDate.getFullYear();
    setMonthAndYear(
      `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentYear}`
    );
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Getting the number of days in the current month
    const datesAndDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth - 1, i); // Creating date for each day of the month
      const dayOfWeek = date.toLocaleDateString("default", {
        weekday: "narrow",
      }); // Getting the day of the week for the date
      const fullDayOfWeek = date.toLocaleDateString("default", {
        weekday: "long",
      });
      const dayOfMonth = date.getDate(); // Getting the day of the month
      datesAndDays.push({ date, dayOfWeek, dayOfMonth, fullDayOfWeek });
    }
    setDatesAndDays(datesAndDays);
  }

  useEffect(() => {
    // Fetch data from the imported JSON file if no local data is present
    let getLocalData = JSON.parse(localStorage.getItem("userData"));
    getLocalData ? setData(getLocalData) : setData(jsonData);
    generateDateAndDays();
  }, []);

  return (
    <>
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
          <Category data={data} datesAndDays={datesAndDays} />
        </tbody>
      </table>
    </>
  );
};

export default App;
