import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { UserProvider } from './modules/auth/contexts/User.Provider';
import { useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import './UI/theme/theme.css';
import 'primeicons/primeicons.css';
import { PlaylistProvider } from './modules/playlists/contexts/PlaylistProvider';


function App() {
  const [error, setError] = useState(null);
  return (
    <PrimeReactProvider>
      <UserProvider>
        <PlaylistProvider>
          <AppRoutes>

          </AppRoutes>
        </PlaylistProvider>
      </UserProvider>
    </PrimeReactProvider>
  );
}

export default App;
