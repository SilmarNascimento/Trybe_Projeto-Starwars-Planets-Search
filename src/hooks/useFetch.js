import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [planetData, setPlanetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPlanet, setFilteredPlanet] = useState([]);

  const removeResidents = (array) => array.map((planet) => {
    delete planet.residents;
    return planet;
  });

  const fetchInfo = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const planetsInformation = await response.json();
    setPlanetData(removeResidents(planetsInformation.results));
    setFilteredPlanet(removeResidents(planetsInformation.results));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {
    planetData,
    filteredPlanet,
    isLoading,
    setFilteredPlanet,
  };
}
