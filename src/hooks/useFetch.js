import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInfo = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const planetsInformation = await response.json();
      setData(planetsInformation.results.map((planet) => {
        delete planet.residents;
        return planet;
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return ({
    data,
    isLoading,
  });
}
