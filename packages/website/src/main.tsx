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
import AddCardPage from './pages/AddCard';
import AddCardSuccess from './pages/AddCardSuccess';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} />
      {/* <Route path="/editCard/:id" element={<EditCard />} /> */}
      <Route path="/addCard" element={<AddCardPage />} />
      <Route path="/addCardSuccess" element={<AddCardSuccess />} />
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
