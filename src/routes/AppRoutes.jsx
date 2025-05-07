import { Navigate, Route, Routes } from 'react-router';
import { useContext } from 'react';

import { DashboardPage } from '../modules/dashboard/pages/Dashboard';
import { Loginpage } from '../modules/auth/pages/LoginPage';
import { UserContext } from '../modules/auth/contexts/User.Context';
import { Menu } from '../UI/components/layout/menubar';

export const AppRoutes = () => {
  const { userState: { logged } } = useContext(UserContext);

  if (!logged) {
    return (
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route element={<Menu />}>
      <Route path="/Dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
