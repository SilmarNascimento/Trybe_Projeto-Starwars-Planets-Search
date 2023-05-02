import React from 'react';
import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import Table from './Components/Table';
import PlanetContext from './contexts/PlanetContext';
import useFetch from './hooks/useFetch';

function App() {
  const URL = 'https://swapi.dev/api/planets';
  const { planetData, isLoading, setPlanetData } = useFetch(URL);

  const contextObj = {
    planetData,
    isLoading,
    setPlanetData,
  };

  return (
    <PlanetContext.Provider value={ contextObj }>
      <Header />
      <div>
        <Form />
        <Table />
      </div>
    </PlanetContext.Provider>
  );
}

export default App;
