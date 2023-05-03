import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import Table from './Components/Table';
import PlanetContext from './contexts/PlanetContext';
import useFetch from './hooks/useFetch';

function App() {
  const URL = 'https://swapi.dev/api/planets';
  const { planetData, filteredPlanet, isLoading, setFilteredPlanet } = useFetch(URL);

  const MAIOR = 'maior que';
  const MENOR = 'menor que';
  const IGUAL = 'igual a';

  const filterFeature = (operation, value) => {
    switch (operation) {
    case MAIOR:
      setFilteredPlanet(filteredPlanet.filter((item) => item > value));
      break;
    case MENOR:
      setFilteredPlanet(filteredPlanet.filter((item) => item < value));
      break;
    case IGUAL:
      setFilteredPlanet(filteredPlanet.filter((item) => item === value));
      break;
    default:
      return array;
    }
  };

  console.log(filteredPlanet);

  const contextObj = {
    planetData,
    filteredPlanet,
    isLoading,
    setFilteredPlanet,
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
