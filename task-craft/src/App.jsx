import { useEffect, useState } from "react";
import Header from "./components/Header";
import DateComponent from "./components/DateComponent";
import jsonData from "./assets/tasks.json";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let getLocalData = JSON.parse(localStorage.getItem("userData"));
    // Fetch data from the imported JSON file if no local data is present
    getLocalData ? setData(getLocalData) : setData(jsonData);
  }, []);

  return (
    <>
      <Header />
      <DateComponent data={data} />
    </>
  );
};

export default App;
