import { createBrowserRouter } from 'react-router';
import HomePage from './pages/home-page';
import ResultsPage from './pages/results-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/explore',
    Component: ResultsPage,
  },
]);
