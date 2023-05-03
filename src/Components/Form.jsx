import { useContext, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function Form() {
  const {
    planetData,
    filteredPlanet,
    filters,
    setFilteredPlanet,
    setFilters,
    filterFeature,
  } = useContext(PlanetContext);

  const features = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const maxLimitFilter = 5;

  const [nameInput, setNameInput] = useState('');
  const [featureInput, setFeatureInput] = useState('population');
  const [operationInput, setOperationInput] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');

  const nameFilter = (array, value) => array.filter((item) => item.name.includes(value));

  const refreshState = (array) => {
    const avaliableFeatures = features
      .filter((feature) => !array
        .find((filter) => filter.feature === feature));
    console.log(avaliableFeatures);
    setFeatureInput(avaliableFeatures[0]);
    setOperationInput('maior que');
    setValueFilter('0');
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const newFilter = {
      feature: featureInput,
      operation: operationInput,
      value: parseInt(valueFilter, 10),
    };
    const newFilterSet = [...filters, newFilter];
    setFilters(newFilterSet);
    newFilterSet.forEach((filter) => {
      const {
        feature,
        operation,
        value,
      } = filter;
      setFilteredPlanet(filterFeature(filteredPlanet, feature, operation, value));
      refreshState(newFilterSet);
    });
  };

  return (
    <form action="">
      <fieldset>
        <legend>Campo de Busca</legend>
        <section>
          <label htmlFor="nameFilter">Pesquisar por Nome</label>
          <input
            type="text"
            name="nameFilter"
            id="nameFilter"
            value={ nameInput }
            onChange={ ({ target: { value } }) => {
              setNameInput(value);
              setFilteredPlanet(nameFilter(planetData, value));
            } }
            data-testid="name-filter"
          />
        </section>
        <section>
          <label htmlFor="featureInput">Característica</label>
          <select
            name="featureInput"
            id="featureInput"
            value={ featureInput }
            onChange={ ({ target: { value } }) => setFeatureInput(value) }
            data-testid="column-filter"
          >
            {
              features.map((feature) => {
                if (!filters.find((filter) => filter.feature === feature)) {
                  return (
                    <option
                      key={ feature }
                      value={ feature }
                    >
                      { feature }
                    </option>
                  );
                }
                return undefined;
              }).filter((option) => option !== undefined)
            }
          </select>
          <label htmlFor="operationinput">Operador</label>
          <select
            name="operationInput"
            id="operationInput"
            value={ operationInput }
            onChange={ ({ target: { value } }) => setOperationInput(value) }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            name="valueFilter"
            value={ valueFilter }
            id="valueFilter"
            onChange={ ({ target: { value } }) => setValueFilter(value) }
            data-testid="value-filter"
          />
          <button
            disabled={ filters.length === maxLimitFilter }
            onClick={ (event) => handleFilter(event) }
            data-testid="button-filter"
          >
            Filtrar
          </button>
        </section>
      </fieldset>
    </form>
  );
}

export default Form;
