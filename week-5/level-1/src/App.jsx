import './App.css'
import PostBusinessCard from './components/PostBusinessCard';
import ViewBusinessCard from './components/ViewBusinessCard';
import { useEffect, useState } from 'react';

function App() {
  const [businessCards, setBusinessCards] = useState([]);

  function fetchData() {
    fetch("http://localhost:3004/getCards").then(async (res) => {
      const listOfBusinessCard = await res.json();
      console.log(listOfBusinessCard);
      setBusinessCards(listOfBusinessCard);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Post your business card details</h1>
      <PostBusinessCard fetchData={fetchData} /><br /><br />
      <h1>All business card</h1>
      <ViewBusinessCard businessCards={businessCards} />
    </>
  )
}

export default App
