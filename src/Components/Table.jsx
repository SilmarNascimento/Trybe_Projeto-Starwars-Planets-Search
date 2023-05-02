import { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function Table() {
  const { planetData, isLoading } = useContext(PlanetContext);
  const features = Object.keys(planetData[0] ?? []);

  const renderTableheader = () => {
    if (!isLoading) {
      const headers = features.map((title, idx) => <th key={ idx }>{ title }</th>);
      return headers;
    }
  };

  const renderTableBody = () => {
    if (!isLoading) {
      const planetDescription = planetData.map((planet, index) => (
        <tr key={ index }>
          { features.map((feature, position) => (
            <th key={ `${planet}-${position}` }>
              { planet[feature] }
            </th>
          )) }
        </tr>
      ));
      return planetDescription;
    }
  };

  console.log(planetData, isLoading);
  return (
    <div>
      { isLoading && <p>Carregando...</p> }
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            { isLoading ? <th>Carregando...</th> : renderTableheader() }
          </tr>
        </thead>
        <tbody>
          { !isLoading && renderTableBody() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
