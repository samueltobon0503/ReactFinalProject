import './App.css';
import { useEffect, useState } from 'react';
import { getToken } from './shared/authorization.service';

function App() {

  const [token, setToken] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    getToken()
      .then(response => {
        console.log('Token obtenido:', response.data);
        setToken(response.data);
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
      {token && <p>Token obtenido con éxito: {token.access_token}</p>}
      </header>
    </div>
  );
}

export default App;
