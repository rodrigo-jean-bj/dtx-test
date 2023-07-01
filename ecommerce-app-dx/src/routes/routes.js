import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/cart',
    component: CartPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

export default routes;
