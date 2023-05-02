import { useContext, useState } from 'react';
import PlanetContext from '../contexts/PlanetContext';
import useTextFilter from '../hooks/useTextFilter';

function Form() {
  const { planetData, isLoading } = useContext(PlanetContext);
  const [nameFilter, setNameFilter] = useState('');
  const [valueInput, setValueinput] = useState(0);

  return (
    <form action="">
      <fieldset>
        <legend>Campo de Busca</legend>
        <div>
          <label htmlFor="nameFilter">Pesquisar por Nome</label>
          <input
            type="text"
            name="nameFilter"
            id="nameFilter"
            value={ nameFilter }
            onChange={ ({ target: { value } }) => {
              setNameFilter(value);
              useTextFilter(value);
            } }
            data-testid="name-filter"
          />
        </div>
        <div />
      </fieldset>
    </form>
  );
}

export default Form;
