import { useEffect, useState } from 'react'
import Header  from './components/Header'
import jsonData from './assets/tasks.json';

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    let getLocalData = JSON.parse(localStorage.getItem('userData'))
    // Fetch data from the imported JSON file if no local data is present
    getLocalData ? setData(getLocalData) : setData(jsonData);
    console.log('Fetched Data:', data); 
  }, []);

  return (
    <>
      <Header />
      {data && (
      <div>
        <h2>Fetched Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )}
    </>
  )
}

export default App
