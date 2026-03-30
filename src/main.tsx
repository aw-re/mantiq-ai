import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import './index.css';
import './i18n'; // Import i18n initialization
import Loader from './components/Loader';
import RootLayout from './layouts/RootLayout';
import AdminLayout from './layouts/AdminLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const ModelsPage = lazy(() => import('./pages/ModelsPage'));
const ExclusivePage = lazy(() => import('./pages/ExclusivePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts'));
const AdminPostEditor = lazy(() => import('./pages/admin/AdminPostEditor'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><HomePage /></Suspense> },
      { path: 'news/:id', element: <Suspense fallback={<Loader />}><NewsPage /></Suspense> },
      { path: 'models', element: <Suspense fallback={<Loader />}><ModelsPage /></Suspense> },
      { path: 'exclusive', element: <Suspense fallback={<Loader />}><ExclusivePage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<Loader />}><AboutPage /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loader />}><NotFoundPage /></Suspense> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><AdminDashboard /></Suspense> },
      { path: 'posts', element: <Suspense fallback={<Loader />}><AdminPosts /></Suspense> },
      { path: 'posts/new', element: <Suspense fallback={<Loader />}><AdminPostEditor /></Suspense> },
      { path: 'posts/:id', element: <Suspense fallback={<Loader />}><AdminPostEditor /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loader />}><NotFoundPage /></Suspense> },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);

