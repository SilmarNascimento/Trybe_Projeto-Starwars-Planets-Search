import PlanetContext from './PlanteContext';
import useFetch from '../hooks/useFetch';

// eslint-disable-next-line react/prop-types
function Provider({ children }) {
  const URL = 'https://swapi.dev/api/planets';
  const { data, isLoading } = useFetch(URL);

  console.log(data);

  return (
    <PlanetContext.Provider value={ { data, isLoading } }>
      { children }
    </PlanetContext.Provider>
  );
}

export default Provider;
