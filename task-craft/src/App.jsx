import { useEffect, useState } from "react";
import Header from "./components/Header";
import DateComponent from "./components/DateComponent";
import Category from "./components/Category";
import jsonData from "./assets/tasks.json";
import DataComponent from "./components/DataComponent";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the imported JSON file if no local data is present
    let getLocalData = JSON.parse(localStorage.getItem("userData"));
    getLocalData ? setData(getLocalData) : setData(jsonData);
  }, []);

  return (
    <>
      <DateComponent data={data} />
    </>
  );
};

export default App;
