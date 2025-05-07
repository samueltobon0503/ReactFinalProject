import { useEffect, useState } from 'react';
import { getPlay } from '../../../core/services/playslistTest.service';

export const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlay()
      .then((response) => {
        console.log('Data:', response);
        setData(response);
      })
      .catch((error) => {
        console.error('Error data:', error);
        setError(error);
      });
  }, []);

  return (
      <div className="dashboard-content">
        <h1>Contenido del dashboard</h1>
        {error && <p>Error: {error.message}</p>}
        {data && <p>Data obtenido con éxito: {JSON.stringify(data.data)}</p>}

      </div>
  );
};
