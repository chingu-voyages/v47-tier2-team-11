// App.jsx
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Category from "./components/Category";
import jsonData from "./assets/tasks.json";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let getLocalData = JSON.parse(localStorage.getItem("userData"));
    getLocalData ? setData(getLocalData) : setData(jsonData);
  }, []);

  return (
    <>
      <Header />
      <Category data={data} />
    </>
  );
};

export default App;
