import { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function useTextFilter(value) {
  const { planetdata, setPlanetData } = useContext(PlanetContext);
  setPlanetData(planetdata.filter((item) => item.includes(value)));
}

export default useTextFilter;
