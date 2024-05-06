import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationData from './components/LocationData';
import ResidentCard from './components/ResidentCard';


function App() {

  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);
  const [location, getLocation, isLoading, hasError] = useFetch();

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    const id = parseInt(enteredValue, 10);
    if (!isNaN(id) && id >= 1 && id <= 126) {
      setInputValue(id);  
    } else {
      alert("Please enter a valid ID between 1 and 126.");
    }
    textInput.current.value = ''; 
  }
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
      <div className='app'>
        <img src="https://i.redd.it/o6cwlzg3exk41.png" />
        <h1>Rick and Morty</h1>
        <form className='app__form' onSubmit={handleSubmit}>
          <input className='app__input' type="text" ref={textInput} placeholder="Enter ID (1-126)" />
          <button className='app__btn'>Search</button>
        </form>
        {
        hasError || inputValue==='0' ? (
          <h2>Hey! you must provide an ID from 1 to 126</h2>
        ) : (
          <>
            <LocationData location={location} />
            <div className='app_container'>
              {location?.residents.map(resident => (
                <ResidentCard key={resident} url={resident} />
              ))}
            </div>
          </>
        )}
      </div>
    )}
  </>
);
}

export default App;