import './App.css';
import { useState } from 'react';
import Header from './Components/Header';
import Form from './Components/Form';
import Table from './Components/Table';
import PlanetContext from './contexts/PlanetContext';
import useFetch from './hooks/useFetch';

function App() {
  const URL = 'https://swapi.dev/api/planets';
  const { planetData, filteredPlanet, isLoading, setFilteredPlanet } = useFetch(URL);
  const [filters, setFilters] = useState([]);

  const MAIOR = 'maior que';
  const MENOR = 'menor que';
  const IGUAL = 'igual a';

  const filterFeature = (feature, operation, value) => {
    switch (operation) {
    case MAIOR:
      console.log('entrei maior');
      setFilteredPlanet(filteredPlanet
        .filter((item) => parseInt(item[feature], 10) > value));
      break;
    case MENOR:
      console.log('entrei menor');
      setFilteredPlanet(filteredPlanet
        .filter((item) => parseInt(item[feature], 10) < value));
      break;
    case IGUAL:
      setFilteredPlanet(filteredPlanet
        .filter((item) => parseInt(item[feature], 10) === value));
      break;
    default:
      break;
    }
  };

  const contextObj = {
    planetData,
    filteredPlanet,
    filters,
    isLoading,
    setFilteredPlanet,
    setFilters,
    filterFeature,
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
