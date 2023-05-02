import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [planetData, setPlanetData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const removeResidents = (array) => array.map((planet) => {
    delete planet.residents;
    return planet;
  });

  const fetchInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const planetsInformation = await response.json();
      setPlanetData(removeResidents(planetsInformation.results));
    } catch (error) {
      console.log('erro');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return {
    planetData,
    isLoading,
  };
}
