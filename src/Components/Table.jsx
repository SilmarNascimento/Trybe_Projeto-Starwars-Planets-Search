import { useContext } from 'react';
import PlanetContext from '../contexts/PlanetContext';

function Table() {
  const { planetData, filteredPlanet, isLoading } = useContext(PlanetContext);
  const features = Object.keys(planetData[0] ?? []);

  const renderTableheader = () => {
    if (!isLoading) {
      const headers = features.map((title, idx) => <th key={ idx }>{ title }</th>);
      return headers;
    }
  };

  const renderTableBody = () => {
    if (!isLoading) {
      const planetDescription = filteredPlanet.map((planet, index) => (
        <tr key={ index }>
          {
            features.map((feature, position) => {
              if (feature === 'name') {
                return (
                  <th key={ `${planet}-${position}` } data-testid="planet-name">
                    { planet[feature] }
                  </th>
                );
              }
              return (
                <th key={ `${planet}-${position}` }>
                  { planet[feature] }
                </th>
              );
            })
          }
        </tr>
      ));
      return planetDescription;
    }
  };

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
          { !isLoading && renderTableBody() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
