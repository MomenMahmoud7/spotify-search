import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query';
import appQueryClient from './configs/appQueryClient';
import Home from './components/Home';
import Playlists from './components/Playlists';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/playlists',
    element: <Playlists />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={appQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
