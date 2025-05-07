import './App.css';
import CryptoJS from 'crypto-js';
import { AppRoutes } from './routes/AppRoutes';
import { UserProvider } from './modules/auth/contexts/User.Provider';
import { useEffect, useState } from 'react';
import { getToken } from './core/services/authorization.service';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import './UI/theme/theme.css';
import 'primeicons/primeicons.css';


function App() {
  const [error, setError] = useState(null);

  useEffect(() => {
    getToken()
      .then(response => {
        console.log('Token obtenido:', response.data);
        const secretKey = process.env.REACT_APP_SPOTIFY_ENCRYPT_KEY;
        const encryptedToken = CryptoJS.AES.encrypt(
          JSON.stringify(response.data),
          secretKey
        ).toString();

        localStorage.setItem('Spotify_token', encryptedToken);
      })
      .catch(error => {
        console.error('Error obteniendo el token:', error);
        setError(error);
      });
  }, []);
  return (
    <PrimeReactProvider>
      <UserProvider>
        <AppRoutes>
          
        </AppRoutes>
      </UserProvider>
    </PrimeReactProvider>
  );
}

export default App;
