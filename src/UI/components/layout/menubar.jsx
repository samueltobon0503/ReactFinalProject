import { Menubar } from 'primereact/menubar';
import { Outlet } from 'react-router-dom';

import './DashboardPage.css';

export const Menu = () => {

  const items = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Features', icon: 'pi pi-star' },
  ];

  const start = (
    <img
      alt="logo"
      src="/assets/logo.png"
      height="40"
      className="mr-2"
    />
  );

  const end = (
    <div className="flex align-items-center gap-2">
      <span className="pi pi-search">Loguot</span>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Menubar model={items} start={start} end={end} className="custom-menubar" />
      <Outlet />
    </div>
  );
};