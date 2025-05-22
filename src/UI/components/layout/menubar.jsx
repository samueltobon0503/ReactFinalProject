import { Menubar } from 'primereact/menubar';
import { Outlet } from 'react-router-dom';
import './menubar.css';
import { useContext } from 'react';
import { UserContext } from '../../../modules/auth/contexts/User.Context';

export const Menu = () => {

    const { logout } = useContext(UserContext);

  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/Dashboard' },
    { label: 'Perfil', icon: 'pi pi-user', url: '/Profile' },
    // { label: 'Prueba sin spotify', icon: 'pi pi-warning' , url:'/No-spotify-auth'},
  ];

    const onLogOut = (_target) => {
      logout()
   };


  const start = (
    <img
      alt="logo"
      src="/assets/logo.png"
      height="40"
      className="mr-2"
    />
  );

  const end = (
    <div className="d-flex align-items-center gap-2 text-white logout">
      <i className="pi pi-power-off"></i>
      <p onClick={onLogOut} className="mb-0">Cerrar sesión</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Menubar model={items} start={start} end={end} className="custom-menubar" />
      <Outlet />
    </div>
  );
};