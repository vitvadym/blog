import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from '../pages/Home';
import PostPage from '../pages/PostPage';
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import AddPost from '../pages/admin/AddPost';
import Posts from '../pages/admin/Posts';
import Comments from '../pages/admin/Comments';
import LoginPage from '../pages/Login';
import ProtectedRoute from '../pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/post/:slug', element: <PostPage /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'add', element: <AddPost /> },
          { path: 'posts', element: <Posts /> },
          { path: 'comments', element: <Comments /> },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
