import { useEffect, useState } from 'react';
import { getP } from '../../../core/services/playslistTest.service';

export const DashboardPage = () =>{

  const [data, setData] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    getP("sr.tobon")
      .then(response => {
        console.log('Token obtenido:', response);
        setData(response);
      })
      .catch(error => {
        console.error('Error obteniendo el token:', error);
        setError(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>Prueba de token</h1>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data obtenido con éxito: {data}</p>}
      </header>
    </div>
  );
}