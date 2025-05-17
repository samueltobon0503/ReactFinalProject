import { Navigate, Route, Routes } from 'react-router';
import { useContext } from 'react';

import { DashboardPage } from '../modules/dashboard/pages/Dashboard';
import { Loginpage } from '../modules/auth/pages/LoginPage';
import { UserContext } from '../modules/auth/contexts/User.Context';
import { Menu } from '../UI/components/layout/menubar';
import { UserProfile } from '../modules/profile/pages/user-profile';

import { NoSpotifyAuth } from '../modules/dashboard/pages/NoSpotifyAuth';
import Register from '../modules/auth/pages/Register'





import { Detail, DetailList } from '../modules/DetailList/Detail';

export const AppRoutes = () => {
  const { userState: { logged } } = useContext(UserContext);

  if (!logged) {
    return (
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path='/Register' element={<Register />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path='/No-spotify-auth' element={<NoSpotifyAuth />} />
      <Route element={<Menu />}>
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/Profile" element={<UserProfile />} />
        <Route path="/Detail/:id" element={<DetailList />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
