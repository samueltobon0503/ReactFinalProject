import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { UserProvider } from './modules/auth/contexts/User.Provider';

function App() {

  return (
    <UserProvider>
      <AppRoutes></AppRoutes>
    </UserProvider>
);
}

export default App;
