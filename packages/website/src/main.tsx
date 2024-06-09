import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { UserContextProvider } from '@rpg-manager/contexts';
import Index from './pages/Index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider apiUrl={import.meta.env.VITE_PUBLIC_API}>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
