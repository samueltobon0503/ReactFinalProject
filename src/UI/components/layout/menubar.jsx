import { Menubar } from 'primereact/menubar';
import { Outlet } from 'react-router-dom';

import './menubar.css';

export const Menu = () => {

  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/Dashboard' },
    { label: 'Perfil', icon: 'pi pi-user', url: '/Profile' },
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
    <div className="d-flex align-items-center gap-2 text-white">
      <i className="pi pi-power-off"></i>
      <p className="mb-0">Cerrar sesión</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Menubar model={items} start={start} end={end} className="custom-menubar" />
      <Outlet />
    </div>
  );
};