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
    path: '/component/alert',
    title: 'Alert',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },

  {
    path: '/component/dropdown',
    title: 'Orders',
    icon: 'bi bi-menu-app',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/categories',
    title: 'Categories',
    icon: 'bi bi-dice-1',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/nav',
    title: 'Users',
    icon: 'bi bi-pause-btn',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/table',
    title: 'Products',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
