import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/users',
    title: 'Usuarios',
    icon: 'bi bi-person',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/operators',
    title: 'Operadores',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/incubators',
    title: 'Incubadoras',
    icon: 'bi bi-thermometer-half',
    class: '',
    extralink: false,
    submenu: []
  },
  /* {
    path: '/component/cycles',
    title: 'Ciclos',
    icon: 'bi bi-clock-history',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/alerts',
    title: 'Alertas',
    icon: 'bi bi-bell-fill',
    class: '',
    extralink: false,
    submenu: []
  }, */
  {
    path: '/component/reports',
    title: 'Reportes',
    icon: 'bi bi-file-earmark-bar-graph',
    class: '',
    extralink: false,
    submenu: []
  }
];
