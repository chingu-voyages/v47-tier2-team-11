<<<<<<< HEAD
import { useEffect, useState } from 'react'
import Header from './components/Header'
import jsonData from './assets/tasks.json';
import Task from './components/Task';
=======
// App.jsx
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Category from "./components/Category";
import jsonData from "./assets/tasks.json";
>>>>>>> origin/dev

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    let getLocalData = JSON.parse(localStorage.getItem("userData"));
    getLocalData ? setData(getLocalData) : setData(jsonData);
  }, []);

  return (
    <>
      <Header />
<<<<<<< HEAD
      <Task />
=======
      <Category data={data} />
>>>>>>> origin/dev
    </>
  );
};

export default App;
