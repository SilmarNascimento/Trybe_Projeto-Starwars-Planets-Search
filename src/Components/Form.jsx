import { useContext, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function Form() {
  const {
    planetData,
    filteredPlanet,
    setFilteredPlanet,
  } = useContext(PlanetContext);

  const [nameInput, setNameInput] = useState('');
  const [featureInput, setFeatureinput] = useState('');
  const [operationInput, setOperationInput] = useState('');
  const [valueFilter, setValueFilter] = useState(0);

  const nameFilter = (array, value) => array.filter((item) => item.name.includes(value));

  const handleFilter = () => {
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
            onChange={ ({ target: { value } }) => setFeatureinput(value) }
            data-testid="column-filter"
          >
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotational_period">Rotational Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
          <label htmlFor="operationinput">Operador</label>
          <select
            name="operationInput"
            id="operationInput"
            value={ operationInput }
            onChange={ ({ target: { value } }) => setOperationInput(value) }
            data-testidd="comparison-filter"
          >
            <option value="maior que">Maior que</option>
            <option value="menor que">Menor que</option>
            <option value="igual a">Igual a</option>
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
            onClick={ handleFilter }
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
