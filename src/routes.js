import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import NotFoundPage from './components/pages/NotFoundPage';

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
