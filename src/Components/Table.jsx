import { useContext } from 'react';
import PlanetContext from '../contexts/PlanteContext';

function Table() {
  const { data, isLoading } = useContext(PlanetContext);

  const renderTableheader = () => {
    if (data) {
      const headerTitles = Object.keys(data[0]);
      console.log(headerTitles);
      const headers = headerTitles.map((title, idx) => <th key={ idx }>{ title }</th>);
      console.log(headers);
      return headers;
    }
  };

  console.log(data, isLoading);
  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            { isLoading ? <th>Carregando...</th> : renderTableheader() }
          </tr>
        </thead>
        <tbody>
          <tr />
        </tbody>
      </table>
    </div>
  );
}

export default Table;
