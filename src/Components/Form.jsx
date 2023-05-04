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
  const posSortConst = 1;
  const negSortConst = -1;

  const [nameInput, setNameInput] = useState('');
  const [featureInput, setFeatureInput] = useState('population');
  const [operationInput, setOperationInput] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [sortInfo, setSortInfo] = useState({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });

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

  const handleSort = (event) => {
    event.preventDefault();
    const { order: { column, sort } } = sortInfo;
    const sortedInformation = [...filteredPlanet];
    switch (sort) {
    case 'ASC':
      setFilteredPlanet(sortedInformation.sort((pA, pB) => {
        if (pA[column] === 'unknown') {
          return posSortConst;
        } if (pB[column] === 'unknown') {
          return negSortConst;
        }
        return pA[column] - pB[column];
      }));
      break;
    case 'DESC':
      setFilteredPlanet(sortedInformation.sort((pA, pB) => {
        if (pA[column] === 'unknown') {
          return posSortConst;
        } if (pB[column] === 'unknown') {
          return negSortConst;
        }
        return pB[column] - pA[column];
      }));
      break;
    default:
      break;
    }
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
        <section>
          <label htmlFor="sortInfo">Características</label>
          <select
            name="sortInfo"
            id="sortInfo"
            value={ sortInfo.order.column }
            onChange={
              ({ target: { value } }) => setSortInfo({
                ...sortInfo,
                order: {
                  ...sortInfo.order,
                  column: value,
                },
              })
            }
            data-testid="column-sort"
          >
            { features.map((feature) => (
              <option
                key={ feature }
                value={ feature }
              >
                { feature }
              </option>)) }
          </select>
          <input
            type="radio"
            name="sortOrder"
            value="ASC"
            checked={ sortInfo.order.sort === 'ASC' }
            onChange={
              ({ target: { value } }) => setSortInfo({
                ...sortInfo,
                order: {
                  ...sortInfo.order,
                  sort: value,
                },
              })
            }
            id="sortASC"
            data-testid="column-sort-input-asc"
          />
          <label htmlFor="sortASC">ASC</label>
          <input
            type="radio"
            name="sortOrder"
            value="DESC"
            checked={ sortInfo.order.sort === 'DESC' }
            onChange={
              ({ target: { value } }) => setSortInfo({
                ...sortInfo,
                order: {
                  ...sortInfo.order,
                  sort: value,
                },
              })
            }
            id="sortDESC"
            data-testid="column-sort-input-desc"
          />
          <label htmlFor="sortDESC">DESC</label>
          <button
            onClick={ handleSort }
            data-testid="column-sort-button"
          >
            Ordenar
          </button>
        </section>
      </fieldset>
    </form>
  );
}

export default Form;
