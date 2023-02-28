import * as React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import TeamOverview from './pages/TeamOverview';
import Teams from './pages/Teams';
import UserOverview from './pages/UserOverview';
import Layout from './pages/Layout';

const routes = () => [
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '/', element: <Teams />},
        { path: '/team/:teamId', element: <TeamOverview />},
        { path: '/user/:useId', element: <UserOverview />},    
      ]
    }
];
  
export default routes;
