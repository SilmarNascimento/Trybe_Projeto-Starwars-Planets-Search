import { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function Filter() {
  const {
    planetData,
    filterFeature,
    filters,
    setFilteredPlanet,
    setFilters,
  } = useContext(PlanetContext);

  const removeFilter = (event, featureName) => {
    event.preventDefault();
    const newFilters = filters.filter((filter) => filter.feature !== featureName);
    setFilters(newFilters);
    let newPlanetData = [...planetData];
    newFilters.forEach((element) => {
      const {
        feature,
        operation,
        value,
      } = element;
      const filter = filterFeature(newPlanetData, feature, operation, value);
      newPlanetData = [...filter];
    });
    setFilteredPlanet(newPlanetData);
    console.log(newPlanetData);
  };

  const renderFilters = () => filters.map((filter) => {
    const {
      feature,
      operation,
      value,
    } = filter;
    return (
      <div key={ feature } data-testid="filter">
        <span>{ `${feature} ${operation} ${value}` }</span>
        <button
          onClick={ (event) => removeFilter(event, feature) }
        >
          Limpar Filtro
        </button>
      </div>
    );
  });

  return (
    <section>
      <h1>Filter</h1>
      { renderFilters() }
      { (filters.length !== 0)
        && (
          <button
            onClick={ () => {
              setFilters([]);
              setFilteredPlanet(planetData);
            } }
            data-testid="button-remove-filters"
          >
            Remover Tudo
          </button>
        )}
    </section>
  );
}

export default Filter;
