import { Navigate, Route, Routes } from 'react-router';
import { useContext } from 'react';

import { DashboardPage } from '../modules/dashboard/pages/Dashboard';
import { Loginpage } from '../modules/auth/pages/LoginPage';
import { UserContext } from '../modules/auth/contexts/User.Context';

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
      <Route path="/Dashboard" element={<DashboardPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
